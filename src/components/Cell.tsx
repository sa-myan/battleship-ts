import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Player, ShipPosition } from "../game/Player";
import { Ships } from "../game/GameBoard";
import Ship from "../game/Ship";

interface CellProps  {
  x: number;
  y: number;
  player: Player;
  self: boolean;
  isPlayerTurn: boolean;
  setIsPlayerTurn: Dispatch<SetStateAction<boolean>>;
  setPromptText: Dispatch<SetStateAction<string>>;
  isGameReady: boolean;
  setIsGameReady: Dispatch<SetStateAction<boolean>>;
  placementOrientation: "x" | "y";
}

function Cell({
  x,
  y,
  player,
  self,
  isPlayerTurn,
  setIsPlayerTurn,
  setPromptText,
  isGameReady,
  setIsGameReady,
  placementOrientation,
}: CellProps) {
  const [cssClassName, setCssClassName] = useState(className());
  

  function createShipList(player: Player) {
    const list: Ship[] = [];
    for (let ship in player.getBoard().getShips()) {
      list.push(player.getBoard().getShips()[ship as keyof Ships]);
    }
    return list;
  }

  const placedShipList = useRef([] as ShipPosition[]);

  const [shipList, setShipList] = useState(createShipList(player))

  function className() {
    let cn = "cell ";
    if (self) {
      cn += "self ";
      if (player.getBoard().getBoard(x, y).ship) {
        cn += "ship ";
      }
    } else {
      cn += "enemy ";
    }
    if (player.getBoard().getBoard(x, y).hit) {
      cn += "hit ";
      if (player.getBoard().getBoard(x, y).ship) {
        cn += "ship ";
      }
    } else {
      cn += "no-hit ";
    }
    return cn;
  }

  function handleClick() {
    switch (isGameReady) {
      case true:
        if (self || !isPlayerTurn) {
          return;
        }
        const outcome = player.attack(x, y);
        if (outcome) {
          setCssClassName(className());
          setIsPlayerTurn(false);
        }
        break;
      case false:
        if (!self) {
          return;
        }
        if (shipList.length > 0) {
          const currentShip = shipList[0];
          setShipList([...shipList].slice(1))
          placedShipList.current.push({
            ship: currentShip as Ship,
            start: [x, y],
            dir: placementOrientation,
          });
        }
    }
  }

  useEffect(() => {
    switch (isGameReady) {
      case true:
        setPromptText(`${player.getName()}'s turn`);
        if (!self && !isPlayerTurn) {
          player.attack();
          setIsPlayerTurn(true);
        }
        break;
      case false:
        setPromptText(
          `Place your ${shipList[0].getName()} ${
            placementOrientation == "x" ? "horizontally" : "vertically"
          }!`
        );
        if (shipList.length == 0) {
          if (self) {
            player.placeShips(placedShipList.current);
          } else {
            player.placeShipsRandomly();
          }
          setIsGameReady(true);
        }
    }
  });

  return <div onClick={handleClick} className={cssClassName}></div>;
}

export default Cell;
