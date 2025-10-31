import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/global.scss";
import Loader from "./components/Loader/Loader";
import Game from "./pages/Game";
import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo";
import { useLoaderFlow } from "./hooks/useLoaderFlow";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const {
    curtainStarted,
    mainVisible,
    handleLoaderReady,
    handleCurtainEnd,
  } = useLoaderFlow();

  return (
    <div className="app-root">
      <BackgroundVideo videoRef={videoRef} />

      <Loader
        active={!mainVisible}
        onReady={handleLoaderReady}
        startCurtain={curtainStarted}
        onCurtainEnd={handleCurtainEnd}
      />

      {mainVisible && (
        <main className="main-root">
          <Routes>
            <Route path="/" element={<Home videoRef={videoRef} />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </main>
      )}
    </div>
  );
}
