import GameBoard, { Ships } from "./GameBoard";
import Ship from "./Ship";

export class Player {
  #name: string;
  #board = new GameBoard();
  #Enemy: Player | null = null;
  static #playerCounter = 1;

  constructor(name: string = `Player #${Player.#playerCounter}`) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getBoard() {
    return this.#board;
  }

  setEnemy(opponent: Player) {
    this.#Enemy = opponent;
  }

  getEnemy() {
    return this.#Enemy;
  }

  attack(x?: number, y?: number) {
    if (!this.#Enemy) {
      return false;
    }
    if (x !== undefined && y !== undefined) {
      if (x < 1 || x > 10 || y < 1 || y > 10) {
        return false;
      }
      return this.getEnemy()!.getBoard().receiveAttack(x, y);
    }
    return false;
  }

  placeShipsRandomly() {
    const randomNum = () => Math.floor(Math.random() * (10 - 1 + 1) + 1);
    const randomDir = () => (Math.random() > 0.5 ? "x" : "y");
    const ships = this.getBoard().getShips();
    for (let ship in ships) {
      do {
        var check = this.getBoard().placeShip(
          ships[ship as keyof Ships],
          randomNum(),
          randomNum(),
          randomDir()
        );
      } while (!check);
    }
    return true;
  }

  placeShips(
    startPostions: { ship: Ship; start: [number, number]; dir: "x" | "y" }[]
  ) {
    if (startPostions.length !== 5) {
      return false;
    }

    for (let cell of startPostions) {
      if (
        !this.getBoard().placeShip(
          cell.ship,
          cell.start[0],
          cell.start[1],
          cell.dir
        )
      ) {
        return false;
      }
    }
    return true;
  }
}

export class AiPlayer extends Player {
  static #aiCounter = 1;

  constructor() {
    super(`AI #${AiPlayer.#aiCounter}`);
    AiPlayer.#aiCounter++;
  }

  override attack() {
    if (!this.getEnemy()) {
      return false;
    }
    const validMoves: [number, number][] = [];

    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        if (!this.getEnemy()!.getBoard().getBoard(i, j).hit) {
          validMoves.push([i, j]);
        }
      }
    }

    if (validMoves.length < 1) {
      return false;
    }

    const randomNumber = Math.floor(Math.random() * validMoves.length);
    const randomCell = validMoves[randomNumber];
    super.attack(randomCell[0], randomCell[1]);
    return true;
  }
}
