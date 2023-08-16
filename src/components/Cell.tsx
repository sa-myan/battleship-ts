import { useState, useLayoutEffect, Dispatch, SetStateAction } from "react";
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
}: CellProps) {

  const [cellClass, setCellClass] = useState('')

  useLayoutEffect(() => {
    const thisCell = player.getBoard().getBoard(x,y)
    // setCellClass(`cell ${thisCell.hit? 'hit':''} ${thisCell.ship? (self? 'ship': (thisCell.hit? 'ship': '') ): ''}`)
    // cheat code for debug
    setCellClass(`cell ${thisCell.hit? 'hit':''} ${thisCell.ship? (self? 'ship': (true? 'ship': '') ): ''}`)

  })

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
  }

  return <div className={cellClass} onClick={handleClick}></div>;
}

export default Cell;
