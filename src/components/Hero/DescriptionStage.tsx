import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.scss";
import gsap from "gsap";

const cards = [
  {
    title: "The Threat",
    text: "The Rabbit Kingdom is under attack by the Red Balls! They’ve breached the outer fields and are bouncing toward the capital at alarming speed.",
  },
  {
    title: "Your Mission",
    text: "You are the only one agile enough to stop them. Jump over 10 red balls to protect your fellow rabbits and restore peace to the neon lands.",
  },
  {
    title: "The Reward",
    text: "If you succeed, you’ll be honored with a special invitation to the legendary neon-style Halloween party — a celebration like no other! 🐰🎃✨",
  },
];

export default function DescriptionStage({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0);
  const isLast = step === cards.length - 1;
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [step]);

  return (
    <div className={styles.cardContainer}>
      <div ref={cardRef} className={styles.card}>
        <h2 className={styles.heroTitle}>{cards[step].title}</h2>
        <p className={styles.heroSub}>{cards[step].text}</p>
        <button
          className={`${styles.heroBtn} ${styles.nextBtn}`}
          onClick={() => (isLast ? onNext() : setStep(step + 1))}
        >
          {isLast ? "Start →" : "Next →"}
        </button>
      </div>
    </div>
  );
}
