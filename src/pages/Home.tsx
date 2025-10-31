import React from "react";
import Hero from "../components/Hero/Hero";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

export default function Home({ videoRef }: Props) {
  return (
    <div className="home-root">
      <Hero videoRef={videoRef} />
    </div>
  );
}
