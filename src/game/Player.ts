import GameBoard from "./GameBoard";

export class Player {
  #name: string;
  #board = new GameBoard()
  #Enemy: Player | null = null;
  static #playerCounter = 1

  constructor(name: string = `Player #${Player.#playerCounter}`) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getBoard(){
    return this.#board
  }

  setEnemy(opponent: Player){
    this.#Enemy = opponent
  }

  getEnemy(){
    return this.#Enemy
  }

  attack(x?: number, y?: number) {
    if (!this.#Enemy){
      return false
    }
    if (x !== undefined && y !== undefined){
      if (x < 1 || x > 10 || y < 1 || y > 10) {
        return false;
      }
      return this.getEnemy()!.getBoard().receiveAttack(x, y);
    }
    return false
  }
}

export class AiPlayer extends Player {
  static #aiCounter = 1;

  constructor() {
    super(`AI #${AiPlayer.#aiCounter}`);
    AiPlayer.#aiCounter++
  }

  override attack(){
    if (!this.getEnemy()){
      return false
    }
    const validMoves: [number, number][] = []

    for (let i = 1; i <= 10; i++){
      for (let j = 1; j <= 10; j++){
        if (!this.getEnemy()!.getBoard().getBoard(i,j).hit){
          validMoves.push([i, j])
        }
      }
    }

    if (validMoves.length < 1){
      return false
    }

    const randomNumber = Math.floor(Math.random() * validMoves.length)
    const randomCell = validMoves[randomNumber]
    this.getEnemy()!.getBoard().receiveAttack(randomCell[0], randomCell[1])
    return true
  }

  placeShips(){

  }
  
}
