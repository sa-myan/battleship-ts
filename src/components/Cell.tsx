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
  function createClassName() {
    let cn = "cell ";
    if (self && player.getBoard().getBoard(x, y).ship) {
      cn += "ship ";
    }
    return cn;
  }

  function handleClick() {
    if (!self) {
      return;
    }
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
          }
          else {
            setGameStage("playing");
            setPromptText("Attack now!");
          }
    }
    update(Math.random());
  }

  return <div className={createClassName()} onClick={handleClick}></div>;
}

export default Cell;
