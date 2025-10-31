import { useEffect, useRef } from "react";
import styles from "./Hero.module.scss";
import gsap from "gsap";

export default function WelcomeStage({ onStart }: { onStart: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rootRef.current) {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={rootRef}>
      <h1 className={styles.heroTitle}>Welcome in rabbits kingdom</h1>
      <p className={styles.heroSub}>Are you sure you can save the rabbit kingdom?</p>
      <button className={`${styles.heroBtn} ${styles.startBtn}`} onClick={onStart}>
        Start exploring
      </button>
    </div>
  );
}
