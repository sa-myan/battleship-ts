import Ship from "../../src/game/Ship";

describe("Ship class", () => {
  it("throws an error when length is less than 1", () => {
    expect(() => new Ship(0, "Infinitesmal")).toThrow("Invalid length");
  });
  it("gets the properties correctly", () => {
    const myShip = new Ship(2, "Patrol Ship")
    expect(myShip.getLength()).toBe(2)
    expect(myShip.getName()).toBe("Patrol Ship")
    expect(myShip.getHits()).toBe(0)
  })
  it("is hit and sunk correctly", () => {
    const myShip = new Ship(2, "Patrol Ship")
    expect(myShip.getHits()).toBe(0)
    expect(myShip.isSunk()).toBe(false)
    myShip.hit()
    expect(myShip.getHits()).toBe(1)
    expect(myShip.isSunk()).toBe(false)
    myShip.hit()
    expect(myShip.getHits()).toBe(2)
    expect(myShip.isSunk()).toBe(true)
  })
});
