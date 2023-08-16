import { Dispatch, SetStateAction, useEffect, useLayoutEffect } from "react";
import { Player } from "../game/Player";
import Cell from "./Cell";

interface BoardProps {
  player: Player;
  self: boolean;
  isPlayerTurn: boolean;
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>;
  setLogMessages: Dispatch<SetStateAction<string[]>>;
  gameStage: "start" | "playing" | "end";
  setGameStage: Dispatch<SetStateAction<"start" | "playing" | "end">>;
  shipDirection: "x" | "y";
  gameLog: string[];
  logMessages: string[];
}

function Board({
  player,
  self,
  isPlayerTurn,
  setIsPlayerTurn,
  setLogMessages,
  gameStage,
  setGameStage,
  shipDirection,
  gameLog,
  logMessages,
}: BoardProps) {
  // place enemy ships
  useEffect(() => {
    if (!self) {
      player.placeShipsRandomly();
    }
  }, []);

  // initial prompt for ship placement
  useLayoutEffect(() => {
    switch (gameStage) {
      case "start":
        if (self) {
          let message = `place your ${player.placeNext()!.getName()} ${
            shipDirection === "x" ? "horizontal" : "vertical"
          }ly`;
          gameLog.push(message);
          setLogMessages([...logMessages, message]);
        }
        break;
    }
  }, [shipDirection]);

  useEffect(() => {
    if (gameStage == "playing" && !self && !isPlayerTurn) {
      player.attack();
      setIsPlayerTurn(true);
    }
  }, [isPlayerTurn]);

  return (
    <div className="board-container">
      <h2>{player.getName()}'s board</h2>
      <div className="board">
        {player
          .getBoard()
          .getBoard()
          .slice()
          .reverse()
          .map((row, y) => {
            return row.map((_, x) => {
              return (
                <Cell
                  key={x.toString() + y.toString()}
                  x={x+1}
                  y={y+1}
                  player={player}
                  self={self}
                  isPlayerTurn={isPlayerTurn}
                  setIsPlayerTurn={setIsPlayerTurn}
                  setLogMessages={setLogMessages}
                  logMessages={logMessages}
                  gameLog={gameLog}
                  gameStage={gameStage}
                  setGameStage={setGameStage}
                  shipDirection={shipDirection}
                />
              );
            });
          })}
      </div>
    </div>
  );
}

export default Board;
