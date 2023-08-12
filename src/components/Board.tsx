import { Dispatch, SetStateAction } from "react";
import { Player } from "../game/Player";
import Cell from "./Cell";

interface BoardProps {
  player: Player;
  self: boolean;
  isPlayerTurn: boolean;
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>;
  setPromptText: Dispatch<SetStateAction<string>>;
  isGameReady: boolean;
  setIsGameReady: Dispatch<SetStateAction<boolean>>;
  placementOrientation: "x" | "y";
}

function Board({
  player,
  self,
  isPlayerTurn,
  setIsPlayerTurn,
  setPromptText,
  isGameReady,
  setIsGameReady,
  placementOrientation,
}: BoardProps) {
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
                x={x + 1}
                y={y + 1}
                player={player}
                self={self}
                isPlayerTurn={isPlayerTurn}
                setIsPlayerTurn={setIsPlayerTurn}
                setPromptText={setPromptText}
                isGameReady={isGameReady}
                setIsGameReady={setIsGameReady}
                placementOrientation={placementOrientation}
              />
            );
          });
        })}
    </div>
  );
}

export default Board;
