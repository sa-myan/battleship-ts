import Ship from "./Ship";

export type Cell = { hit: boolean; ship: Ship | null };

export type Ships = {
  carrier: Ship;
  battleship: Ship;
  destroyer: Ship;
  submarine: Ship;
  patrolShip: Ship;
};

export default class GameBoard {
  #ships: Ships = {
    carrier: new Ship(5, "Carrier"),
    battleship: new Ship(4, "Battleship"),
    destroyer: new Ship(3, "Destroyer"),
    submarine: new Ship(3, "Submarine"),
    patrolShip: new Ship(2, "Patrol Ship"),
  };

  getShips() {
    return this.#ships;
  }

  createBoard() {
    let arr: Cell[][] = Array(10).fill(Array(10).fill(null));
    arr = arr.map((row) => {
      return row.map(() => {
        return { hit: false, ship: null };
      });
    });
    return arr;
  }

  #board: Cell[][] = this.createBoard();

  getBoard(): Cell[][];
  getBoard(x: number, y: number): Cell;
  getBoard(x?: number, y?: number) {
    if (arguments.length == 0) {
      return this.#board;
    }
    if (typeof x !== "undefined" && typeof y !== "undefined") {
      return this.#board[x - 1][y - 1];
    }
  }

  // returns true when successfully placed or is already placed
  // returns false for invalid placement attempts
  placeShip(ship: Ship, x: number, y: number, direction: "x" | "y") {
    if (x < 1 || x > 10 || y < 1 || y > 10) {
      return false;
    }
    if (ship.isPlaced){
      return true
    }
    if (direction === "x") {
      if (x - 1 + ship.getLength() > 10) {
        return false;
      }
      // testing for overlaps
      for (let i = x, end = x + ship.getLength(); i < end; i++) {
        if (this.getBoard(i, y).ship !== null) {
          return false;
        }
      }
      // finally, actual placement
      for (let i = x, end = x + ship.getLength(); i < end; i++) {
        this.getBoard(i, y).ship = ship;
      }
    }
    if (direction === "y") {
      if (y - 1 + ship.getLength() > 10) {
        return false;
      }
      // testing for overlaps
      for (let i = y, end = y + ship.getLength(); i < end; i++) {
        if (this.getBoard(x, i).ship !== null) {
          return false;
        }
      }
      // finally, actual placement
      for (let i = y, end = y + ship.getLength(); i < end; i++) {
        this.getBoard(x, i).ship = ship;
      }
    }
    ship.isPlaced = true
    return true;
  }

  receiveAttack(x: number, y: number): boolean {
    if (x < 1 || x > 10 || y < 1 || y > 10) {
      return false;
    }
    if (this.getBoard(x, y).hit === true) {
      return false;
    }
    this.getBoard(x, y).hit = true;
    this.getBoard(x, y).ship?.hit();
    return true;
  }

  areAllSunk() {
    for (let ship in this.#ships) {
      if (!this.#ships[ship as keyof Ships].isSunk()) {
        return false;
      }
    }
    return true;
  }
}
