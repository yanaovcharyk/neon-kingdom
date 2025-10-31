import React from "react";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
};

export default function VideoLayer({ videoRef }: Props) {
  return (
    <video
      ref={videoRef}
      src="/game_background.mp4"
      muted
      loop
      playsInline
      style={{ display: "none" }}
    />
  );
}
