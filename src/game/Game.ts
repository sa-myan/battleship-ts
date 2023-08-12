import { AiPlayer, Player, ShipPosition } from "./Player";

export default class Game {
  readonly p1 = new Player();
  readonly p2 = new AiPlayer();

  placeP1Ships(obj: ShipPosition[]) {
    return this.p1.placeShips(obj);
  }

  placeP2Ships() {
    return this.p2.placeShipsRandomly();
  }

  checkEnd() {
    const p1Lost = this.p1.getBoard().areAllSunk();
    const p2Lost = this.p2.getBoard().areAllSunk();

    if (p1Lost && p2Lost) {
      return "tie";
    } else if (p1Lost) {
      return "p2";
    } else if (p2Lost) {
      return "p1";
    } else {
      return null;
    }
  }
}