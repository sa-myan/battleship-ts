import GameBoard from "../../src/game/GameBoard";

describe("GameBoard class", () => {
  it("creates board and places ships correctly", () => {
    const myBoard = new GameBoard();
    expect(myBoard.placeShip(myBoard.getShips().battleship, 11, 1, "x")).toBe(
      false
    );
    // proper ship placement
    expect(myBoard.placeShip(myBoard.getShips().patrolShip, 7, 1, "x")).toBe(
      true
    );
    // ship would go out of board bounds
    expect(myBoard.placeShip(myBoard.getShips().carrier, 1, 7, "y")).toBe(
      false
    );
    // ship would overlap with another ship
    expect(myBoard.placeShip(myBoard.getShips().submarine, 8, 1, "y")).toBe(
      false
    );
    expect(myBoard.getBoard(7, 1).ship).toBe(myBoard.getShips().patrolShip);
    expect(myBoard.getBoard(8, 1).ship).toBe(myBoard.getShips().patrolShip);
    expect(myBoard.getBoard(9, 1).ship).toBe(null);
  });
  it("receives attacks correctly", () => {
    const myBoard = new GameBoard();
    myBoard.placeShip(myBoard.getShips().patrolShip, 2, 1, "x");
    expect(myBoard.receiveAttack(1, 1)).toBe(true);
    expect(myBoard.receiveAttack(1, 1)).toBe(false);
    expect(myBoard.receiveAttack(2, 1)).toBe(true);
    expect(myBoard.receiveAttack(3, 1)).toBe(true);
    expect(myBoard.receiveAttack(4, 1)).toBe(true);
    expect(myBoard.receiveAttack(11, 1)).toBe(false);
  });
  it("reports all sunk status correctly", () => {
    const myBoard = new GameBoard();
    myBoard.placeShip(myBoard.getShips().carrier, 1, 1, "x");
    myBoard.placeShip(myBoard.getShips().battleship, 1, 2, "x");
    myBoard.placeShip(myBoard.getShips().destroyer, 1, 3, "x");
    myBoard.placeShip(myBoard.getShips().submarine, 1, 4, "x");
    myBoard.placeShip(myBoard.getShips().patrolShip, 1, 5, "x");
    // none hit
    expect(myBoard.areAllSunk()).toBe(false);
    // some hit none sunk
    myBoard.receiveAttack(1, 5);
    expect(myBoard.areAllSunk()).toBe(false);
    // some sunk
    myBoard.receiveAttack(2, 5);
    expect(myBoard.areAllSunk()).toBe(false);
    // waiting for the last hit
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        if (i === 1 && j === 1) {
          continue;
        }
        myBoard.receiveAttack(i, j);
      }
    }
    expect(myBoard.areAllSunk()).toBe(false);
    // all sunk
    myBoard.receiveAttack(1, 1);
    expect(myBoard.areAllSunk()).toBe(true);
  });
});
