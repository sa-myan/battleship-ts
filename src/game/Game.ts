import { AiPlayer, Player } from "./Player";

export default class Game {
  readonly p1 = new Player();
  readonly p2 = new AiPlayer();
  turn = 0

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

  constructor(){
    this.p1.setEnemy(this.p2)
    this.p2.setEnemy(this.p1)
  }
}