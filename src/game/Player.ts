import GameBoard from "./GameBoard";

export class Player {
  #name: string;
  #enemyBoard: GameBoard;

  constructor(name: string, enemyBoard: GameBoard) {
    this.#name = name;
    this.#enemyBoard = enemyBoard;
  }

  getName() {
    return this.#name;
  }

  getEnemyBoard(){
    return this.#enemyBoard
  }

  attack(x?: number, y?: number) {
    if (x !== undefined && y !== undefined){
      if (x < 1 || x > 10 || y < 1 || y > 10) {
        return false;
      }
      return this.#enemyBoard.receiveAttack(x, y);
    }
    return false
  }
}

export class AiPlayer extends Player {
  static #counter = 1;

  constructor(enemyBoard: GameBoard) {
    super(`AI #${AiPlayer.#counter}`, enemyBoard);
    AiPlayer.#counter++
  }

  override attack(){
    const validMoves: [number, number][] = []

    for (let i = 1; i <= 10; i++){
      for (let j = 1; j <= 10; j++){
        if (!this.getEnemyBoard().getBoard(i,j).hit){
          validMoves.push([i, j])
        }
      }
    }

    if (validMoves.length < 1){
      return false
    }

    const randomNumber = Math.floor(Math.random() * validMoves.length)
    const randomCell = validMoves[randomNumber]
    this.getEnemyBoard().receiveAttack(randomCell[0], randomCell[1])
    return true
  }
  
}
