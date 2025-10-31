import React from "react";
import styles from "./Game.module.scss";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export default function CanvasLayer({ canvasRef }: Props) {
  return <canvas ref={canvasRef} className={styles.canvas} />;
}
