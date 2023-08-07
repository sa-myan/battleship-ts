import { Player, AiPlayer } from "../../src/game/Player";
import GameBoard from "../../src/game/GameBoard";

describe("AiPlayer class", () => {
  it("does a legal attack every time", () => {
    const enemyBoard = new GameBoard();
    const ai = new AiPlayer(enemyBoard);
    for (let i = 0; i < 100; i++) {
      expect(ai.attack()).toBe(true);
    }
    expect(ai.attack()).toBe(false);
  });
});
