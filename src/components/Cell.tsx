import { useState, useLayoutEffect, Dispatch, SetStateAction } from "react";
import { Player } from "../game/Player";

interface CellProps {
  x: number;
  y: number;
  player: Player;
  self: boolean;
  isPlayerTurn: boolean;
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>;
  setLogMessages: Dispatch<SetStateAction<string[]>>;
  gameLog: string[];
  gameStage: "start" | "playing" | "end";
  setGameStage: Dispatch<SetStateAction<"start" | "playing" | "end">>;
  shipDirection: "x" | "y";
  logMessages: string[];
}

function Cell({
  x,
  y,
  player,
  self,
  isPlayerTurn,
  setIsPlayerTurn,
  setLogMessages,
  gameLog,
  gameStage,
  setGameStage,
  shipDirection,
  logMessages,
}: CellProps) {
  const [cellClass, setCellClass] = useState("");

  useLayoutEffect(() => {
    const thisCell = player.getBoard().getBoard(x, y);
    setCellClass(
      (() => {
        let cn = "cell ";
        if (thisCell.hit) {
          cn += "hit ";
        }
        if (thisCell.ship?.isSunk()) {
          cn += "sunk ";
        }
        if (thisCell.ship) {
          if (self) {
            cn += "ship";
          } else if (thisCell.hit) {
            cn += "ship";
          }
        }
        return cn;
      })()
    );
  });

  function handleClick() {
    if (!self) {
      switch (gameStage) {
        case "playing":
          if (!isPlayerTurn) {
            return;
          }
          if (player.getEnemy()!.attack(x, y)) {
            setIsPlayerTurn(false);
          }
      }
    } else {
      switch (gameStage) {
        case "start":
          let ship = player.placeNext();
          player.getBoard().placeShip(ship!, x, y, shipDirection);
          if (player.placeNext()) {
            let message = `place your ${player.placeNext()!.getName()} ${
              shipDirection == "x" ? "horizontal" : "vertical"
            }ly`;
            gameLog.push(message);
            setLogMessages([...logMessages, message]);
          } else {
            setGameStage("playing");
            gameLog.push("Attack Now!");
            setLogMessages([...logMessages, "Attack Now!"]);
          }
          break;
      }
    }
  }

  return <div className={cellClass} onClick={handleClick}></div>;
}

export default Cell;
