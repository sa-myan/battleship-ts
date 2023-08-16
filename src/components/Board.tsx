import { Dispatch, SetStateAction, useEffect, useLayoutEffect } from "react";
import { Player } from "../game/Player";
import Cell from "./Cell";

interface BoardProps {
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

function Board({
  player,
  self,
  isPlayerTurn,
  setIsPlayerTurn,
  setPromptText,
  gameStage,
  setGameStage,
  shipDirection,
  update,
}: BoardProps) {
  // place enemy ships
  useEffect(() => {
    if (!self) {
      player.placeShipsRandomly();
    }
  }, []);

  // prompt for ship placement
  useLayoutEffect(() => {
    switch (gameStage) {
      case "start":
        if (self) {
          setPromptText(
            `place your ${player.placeNext()!.getName()} ${
              shipDirection === "x" ? "horizontal" : "vertical"
            }ly`
          );
        }
        break;
    }
  }, [shipDirection]);

  useEffect(() => {
    if (gameStage == "playing" && !self && !isPlayerTurn) {
      player.attack();
      setIsPlayerTurn(() => true);
      update(Math.random());
    }
  }, [isPlayerTurn]);

  return (
    <div className="board">
      {player
        .getBoard()
        .getBoard()
        .map((row, x) => {
          return row.map((_, y) => {
            return (
              <Cell
                key={x.toString() + y.toString()}
                // workaround until proper fix -_-
                // oversight
                x={y + 1}
                y={x + 1}
                player={player}
                self={self}
                isPlayerTurn={isPlayerTurn}
                setIsPlayerTurn={setIsPlayerTurn}
                setPromptText={setPromptText}
                gameStage={gameStage}
                setGameStage={setGameStage}
                shipDirection={shipDirection}
              />
            );
          });
        })}
    </div>
  );
}

export default Board;
