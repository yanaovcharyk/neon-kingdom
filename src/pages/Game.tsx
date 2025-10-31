// src/pages/Game.tsx
import CanvasLayer from "../components/Game/CanvasLayer";
import VideoLayer from "../components/Game/VideoLayer";
import GameOverlay from "../components/Game/GameOverlay";
import { useGameLogic } from "../hooks/useGameLogic";

export default function GamePage() {
  const {
    canvasRef,
    videoRef,
    score,
    gameOver,
    victory,
    resetGame,
  } = useGameLogic();

  return (
    <>
      <VideoLayer videoRef={videoRef} />
      <CanvasLayer canvasRef={canvasRef} />
      {(gameOver || victory) && (
        <GameOverlay
          score={score}
          gameOver={gameOver}
          victory={victory}
          onRestart={resetGame}
        />
      )}
    </>
  );
}
