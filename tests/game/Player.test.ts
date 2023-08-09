import { Player, AiPlayer } from "../../src/game/Player";
import GameBoard from "../../src/game/GameBoard";

describe("Player class", () => {
  it("places ships correctly", () => {
    const human = new Player();
    const ai = new AiPlayer();
    human.setEnemy(ai);
    ai.setEnemy(human);
    expect(ai.placeShipsRandomly()).toBe(true);
    expect(
      human.placeShips([
        {
          ship: human.getBoard().getShips().carrier,
          start: [1, 1],
          dir: "x",
        },
        {
          ship: human.getBoard().getShips().battleship,
          start: [1, 2],
          dir: "x",
        },
        {
          ship: human.getBoard().getShips().submarine,
          start: [1, 3],
          dir: "x",
        },
        {
          ship: human.getBoard().getShips().destroyer,
          start: [1, 4],
          dir: "x",
        },
        {
          ship: human.getBoard().getShips().patrolShip,
          start: [1, 5],
          dir: "x",
        },
      ])
    ).toBe(true);
  });
});

describe("AiPlayer class", () => {
  it("does a legal attack every time", () => {
    const human = new Player();
    const ai = new AiPlayer();
    human.setEnemy(ai);
    ai.setEnemy(human);
    for (let i = 0; i < 100; i++) {
      expect(ai.attack()).toBe(true);
    }
    expect(ai.attack()).toBe(false);
  });
});
