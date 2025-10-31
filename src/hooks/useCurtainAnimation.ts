import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useCurtainAnimation(
  start: boolean,
  onEnd?: () => void
): React.RefObject<HTMLDivElement | null> {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!start || !rootRef.current) return;

    const node = rootRef.current;

    gsap.fromTo(
      node,
      { y: "100%" },
      {
        y: "0%",
        duration: 1.2,
        ease: "power4.out",
        onComplete: () => onEnd?.(),
      }
    );

    return () => {
      gsap.killTweensOf(node);
    };
  }, [start, onEnd]);

  return rootRef;
}
