import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.scss";
import { useMouseParallax } from "../../hooks/useMouseParallax";
import WelcomeStage from "./WelcomeStage";
import DescriptionStage from "./DescriptionStage";
import ButtonsStage from "./ButtonsStage";
import gsap from "gsap";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
};

export default function Hero({ videoRef }: Props) {
  const [started, setStarted] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();
  const centerRef = useRef<HTMLDivElement | null>(null);

  useMouseParallax(videoRef);

  const animateStage = () => {
    if (centerRef.current) {
      gsap.fromTo(
        centerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  };

  const handleStart = async () => {
    try {
      await videoRef.current?.play();
    } catch (err) {
      console.warn("Error while starting video:", err);
    }
    setStarted(true);
  };

  useEffect(() => {
    animateStage();
  }, [started, showDescription]);

  return (
    <section className={styles.heroRoot}>
      <div className={styles.heroOverlay} />
      <div ref={centerRef} className={styles.heroCenter}>
        {!started ? (
          <WelcomeStage onStart={handleStart} />
        ) : !showDescription ? (
          <DescriptionStage onNext={() => setShowDescription(true)} />
        ) : (
          <ButtonsStage onStartGame={() => navigate("/game")} />
        )}
      </div>
    </section>
  );
}
