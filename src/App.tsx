import { useEffect, useState } from "react";
import Board from "./components/Board";
import Game from "./game/Game";
import Prompt from "./components/Prompt";
import "./styles/style.css";

const game = new Game();

function App() {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [promptText, setPromptText] = useState("Prepare for battle");
  const [gameStage, setGameStage] = useState(
    "start" as "start" | "playing" | "end"
  );
  const [shipDirection, setshipDirection] = useState("x" as "x" | "y");
  const [_, update] = useState(0);

  function handleRotateButtonClick() {
    shipDirection == "x" ? setshipDirection("y") : setshipDirection("x");
  }

  return (
    <>
      <Prompt promptText={promptText} setPromptText={setPromptText} />
      {gameStage !== "start" ? null : (
        <button onClick={handleRotateButtonClick}>Rotate</button>
      )}
      {gameStage === "start" ? null : (
        <Board
          self={false}
          player={game.p2}
          isPlayerTurn={isPlayerTurn}
          setIsPlayerTurn={setIsPlayerTurn}
          setPromptText={setPromptText}
          gameStage={gameStage}
          setGameStage={setGameStage}
          shipDirection={shipDirection}
          update={update}
        />
      )}
      <Board
        self={true}
        player={game.p1}
        isPlayerTurn={isPlayerTurn}
        setIsPlayerTurn={setIsPlayerTurn}
        setPromptText={setPromptText}
        gameStage={gameStage}
        setGameStage={setGameStage}
        shipDirection={shipDirection}
        update={update}
      />
    </>
  );
}

export default App;
