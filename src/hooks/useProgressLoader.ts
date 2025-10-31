import { useEffect, useState } from "react";

export function useProgressLoader(active: boolean, onReady?: () => void) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;

    const id = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 4 + 1));
    }, 120);

    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (progress >= 100 && onReady) {
      const t = window.setTimeout(() => onReady(), 400);
      return () => clearTimeout(t);
    }
  }, [progress, onReady]);

  return Math.floor(progress);
}
