import { useRef } from "react";
import gsap from "gsap";

export function useCardTilt() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (0.5 - y / rect.height) * 25;
    const rotateY = (x / rect.width - 0.5) * 25;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center",
    });
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  return { cardRef, handleMouseMove, resetTilt };
}
