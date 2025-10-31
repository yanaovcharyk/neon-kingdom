import styles from "./Game.module.scss";
import { useCardTilt } from "../../hooks/useCardTilt";

type Props = {
  score: number;
  gameOver: boolean;
  victory: boolean;
  onRestart: () => void;
};

export default function GameOverlay({ score, gameOver, victory, onRestart }: Props) {
  const { cardRef, handleMouseMove, resetTilt } = useCardTilt();

  return (
    <div className={styles.overlay}>
      <div className={styles.cardWrapper}>
        <div
          ref={cardRef}
          className={styles.card}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
        >
          {gameOver ? (
            <h2 className={styles.title}>GAME OVER 💀</h2>
          ) : (
            <>
              <h2 className={styles.title}>🎃 You’re Invited!</h2>
              <p className={styles.invitation}>
                Join us for HALLOWEEN: MAVKA vs THE KONOTOP WITCH — a magical,
                costume-theatrical music night where Ukrainian folklore comes alive! ✨
                <br />
                📅 October 31, 2025 (Fri) 🕕 18:00 – 20:00
                <br />
                📍 INKI BAR, 19a Shota Rustaveli St., Kyiv
                <br />
                🕸 Costumes • Music • Magic • INKI PEOPLE Community 🖤
              </p>
            </>
          )}
          <div className={styles.score}>Score: {score}</div>
          <button className={styles.restartBtn} onClick={onRestart}>
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
}

