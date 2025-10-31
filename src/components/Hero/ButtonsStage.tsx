import { useEffect, useRef } from "react";
import styles from "./Hero.module.scss";
import gsap from "gsap";

export default function ButtonsStage({ onStartGame }: { onStartGame: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rootRef.current) {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={rootRef} className={styles.heroButtons}>
      <p className={styles.heroSub}>Okay, hero, we wish you success!</p>
      <button className={styles.heroBtn} onClick={onStartGame}>
        ▶ Start game
      </button>
    </div>
  );
}
