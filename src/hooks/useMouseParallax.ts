import { useEffect, useRef } from "react";

export function useMouseParallax(
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = (e.clientX - window.innerWidth / 2) / 40;
      targetRef.current.y = (e.clientY - window.innerHeight / 2) / 40;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      currentRef.current.x +=
        (targetRef.current.x - currentRef.current.x) * 0.12;
      currentRef.current.y +=
        (targetRef.current.y - currentRef.current.y) * 0.12;

      if (videoRef.current) {
        videoRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) scale(1.03)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [videoRef]);
}
