import { useState } from "react";
import Board from "./components/Board";
import Game from "./game/Game";
import Prompt from "./components/Prompt";
import './styles/style.css'

const game = new Game();

function App() {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [promptText, setPromptText] = useState("Prepare for battle");
  const [isGameReady, setIsGameReady] = useState(false);
  const [placementOrientation, setPlacementOrientation] = useState(
    "x" as "x" | "y"
  );

  function handleRotateButtonClick() {
    placementOrientation == "x"
      ? setPlacementOrientation("y")
      : setPlacementOrientation("x");
  }

  return (
    <>
      {isGameReady ? null : (
        <button onClick={handleRotateButtonClick}>Rotate</button>
      )}
      <Prompt promptText={promptText} setPromptText={setPromptText} />
      <Board
        self={false}
        player={game.p2}
        isPlayerTurn={isPlayerTurn}
        setIsPlayerTurn={setIsPlayerTurn}
        setPromptText={setPromptText}
        isGameReady={isGameReady}
        setIsGameReady={setIsGameReady}
        placementOrientation={placementOrientation}
      />
      <Board
        self={true}
        player={game.p1}
        isPlayerTurn={isPlayerTurn}
        setIsPlayerTurn={setIsPlayerTurn}
        setPromptText={setPromptText}
        isGameReady={isGameReady}
        setIsGameReady={setIsGameReady}
        placementOrientation={placementOrientation}
      />
    </>
  );
}

export default App;
