import GameBoard, { Ships } from "./GameBoard";
import Ship from "./Ship";

export type ShipPosition = { ship: Ship; start: [number, number]; dir: "x" | "y" }

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
      return null;
    }
    if (x !== undefined && y !== undefined) {
      if (x < 1 || x > 10 || y < 1 || y > 10) {
        return null;
      }
       if (this.getEnemy()!.getBoard().receiveAttack(x, y)){
        return {x: x, y: y}
       }
    }
    return null;
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

  placeNext(){
    for (let ship in this.#board.getShips()){
      if (!this.#board.getShips()[ship as keyof Ships].isPlaced){
        return this.#board.getShips()[ship as keyof Ships]
      }
    }
    return null
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
      return null;
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
      return null;
    }

    const randomNumber = Math.floor(Math.random() * validMoves.length);
    const randomCell = validMoves[randomNumber];
    return super.attack(randomCell[0], randomCell[1]);
   
  }
}
