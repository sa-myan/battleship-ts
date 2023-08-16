import { useLayoutEffect, useState } from "react";
import Board from "./components/Board";
import Game from "./game/Game";
import Log from "./components/Log";
import "./styles/style.css";

const game = new Game();

function App() {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStage, setGameStage] = useState(
    "start" as "start" | "playing" | "end"
  );
  const [shipDirection, setshipDirection] = useState("x" as "x" | "y");
  const [logMessages, setLogMessages] = useState([] as string[]);

  function handleRotateButtonClick() {
    shipDirection == "x" ? setshipDirection("y") : setshipDirection("x");
  }

  useLayoutEffect(() => {
    if (!isPlayerTurn) {
      return;
    }
    if (gameStage !== 'playing'){
      return
    }
    let end = game.checkEnd();
    if (!end) {
      return;
    }
    setLogMessages([...logMessages, end]);
    game.log.push(end);
    setGameStage("end");
  });

  return (
    <div className="app">
      <div className="boards-container">
        <Board
          self={true}
          player={game.p1}
          isPlayerTurn={isPlayerTurn}
          setIsPlayerTurn={setIsPlayerTurn}
          gameStage={gameStage}
          setGameStage={setGameStage}
          shipDirection={shipDirection}
          setLogMessages={setLogMessages}
          logMessages={logMessages}
          gameLog={game.log}
        />
        {gameStage === "start" ? null : (
          <Board
            self={false}
            player={game.p2}
            isPlayerTurn={isPlayerTurn}
            setIsPlayerTurn={setIsPlayerTurn}
            gameStage={gameStage}
            setGameStage={setGameStage}
            shipDirection={shipDirection}
            setLogMessages={setLogMessages}
            logMessages={logMessages}
            gameLog={game.log}
          />
        )}
        {gameStage !== "start" ? null : (
          <button onClick={handleRotateButtonClick}>Rotate Ship</button>
        )}
      </div>

      <Log logMessages={logMessages} />
    </div>
  );
}

export default App;
