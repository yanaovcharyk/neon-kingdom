import { useState } from "react";

export function useLoaderFlow() {
  const [curtainStarted, setCurtainStarted] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);

  const handleLoaderReady = () => {
    requestAnimationFrame(() => {
      setTimeout(() => setCurtainStarted(true), 120);
    });
  };

  const handleCurtainEnd = () => {
    setMainVisible(true);
  };

  return {
    curtainStarted,
    mainVisible,
    handleLoaderReady,
    handleCurtainEnd,
  };
}