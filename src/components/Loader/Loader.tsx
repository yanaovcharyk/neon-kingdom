import React, { useEffect, useRef } from "react";
import styles from "./Loader.module.scss";
import { useProgressLoader } from "../../hooks/useProgressLoader";
import { useCurtainAnimation } from "../../hooks/useCurtainAnimation";
import gsap from "gsap";

type LoaderProps = {
  active?: boolean;
  onReady?: () => void;
  startCurtain?: boolean;
  onCurtainEnd?: () => void;
};

export default function Loader({
  active = false,
  onReady,
  startCurtain = false,
  onCurtainEnd,
}: LoaderProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useCurtainAnimation(startCurtain, onCurtainEnd);
  const progress = useProgressLoader(active, onReady);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [progress]);

  useEffect(() => {
    if (active && centerRef.current) {
      gsap.fromTo(
        centerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [active]);

  if (!active && !startCurtain) return null;

  return (
    <div
      ref={rootRef}
      className={`${styles.loaderRoot} ${startCurtain ? styles.curtainUp : ""}`}
    >
      <div ref={centerRef} className={styles.loaderCenter}>
        <h1 className={styles.loaderTitle}>RABBIT IN NEON</h1>
        <p className={styles.loaderSub}>Creating a rabbit kingdom...</p>

        <div
          className={styles.progressWrapper}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            ref={progressBarRef}
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={styles.loaderMeta}>{progress}%</div>
      </div>
    </div>
  );
}
