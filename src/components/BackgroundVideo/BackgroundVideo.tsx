import React from "react";
import styles from "./BackgroundVideo.module.scss";

export default function BackgroundVideo({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) {
  return (
    <video
      ref={videoRef}
      src="/neon-kingdom/background.mp4"
      loop
      muted
      playsInline
      preload="auto"
      className={styles.bgVideo}
    />
  );
}