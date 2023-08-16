import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Player } from "../game/Player";
import { Ships } from "../game/GameBoard";

interface CellProps {
  x: number;
  y: number;
  player: Player;
  self: boolean;
  isPlayerTurn: boolean;
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>;
  setPromptText: Dispatch<SetStateAction<string>>;
  gameStage: "start" | "playing" | "end";
  setGameStage: Dispatch<SetStateAction<"start" | "playing" | "end">>;
  shipDirection: "x" | "y";
  update: Dispatch<SetStateAction<number>>;
}

function Cell({
  x,
  y,
  player,
  self,
  isPlayerTurn,
  setIsPlayerTurn,
  setPromptText,
  gameStage,
  setGameStage,
  shipDirection,
  update,
}: CellProps) {

  function handleClick() {
    if (!self) {
      return
    }
    else{
      switch (gameStage) {
        case "start":
          let ship = player.placeNext();
          player.getBoard().placeShip(ship!, x, y, shipDirection);
          if (player.placeNext()) {
            setPromptText(
              `place your ${player.placeNext()!.getName()} ${
                shipDirection == "x" ? "horizontal" : "vertical"
              }ly`
            );
          } else {
            setGameStage("playing");
            setPromptText("Attack now!");
          }
          break;
      }
    }
    update(Math.random());
  }

  const thisCell = player.getBoard().getBoard(x,y)
  return <div className={`cell ${thisCell.hit? 'hit':''} ${thisCell.ship? (self? 'ship': (thisCell.hit? 'ship': '') ): ''}`} onClick={handleClick}></div>;
}

export default Cell;
