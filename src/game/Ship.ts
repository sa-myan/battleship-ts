export default class Ship{
    #name
    #length
    #hits = 0
    constructor(length: number, name: string){
        if (length < 1){
            throw new Error("Invalid length")
        }
        this.#length = length
        this.#name = name
    }

    getLength(){
        return this.#length
    }

    getName(){
        return this.#name
    }

    getHits(){
        return this.#hits
    }

    isSunk(){
        return this.#hits < this.#length? false: true
    }

    hit(){
        this.#hits++
    }
}