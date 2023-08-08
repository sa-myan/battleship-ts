import { Player, AiPlayer } from "../../src/game/Player";
import GameBoard from "../../src/game/GameBoard";

describe("AiPlayer class", () => {
  it("does a legal attack every time", () => {
    const human = new Player()
    const ai = new AiPlayer();
    human.setEnemy(ai)
    ai.setEnemy(human)
    for (let i = 0; i < 100; i++) {
      expect(ai.attack()).toBe(true);
    }
    expect(ai.attack()).toBe(false);
  });
  it("places ships randomly correctly", () => {
    const human = new Player()
    const ai = new AiPlayer();
    human.setEnemy(ai)
    ai.setEnemy(human)
    expect(ai.placeShips()).toBe(true)
  })
});
