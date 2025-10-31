import { useEffect, useRef, useState } from "react";

interface Ball {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export function useGameLogic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);

  const animationIdRef = useRef<number | null>(null);
  const gameLoopRef = useRef<() => void>(() => {});

  const playerRef = useRef({
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    vy: 0,
    onGround: true,
  });

  const ballsRef = useRef<Ball[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const scoreRef = useRef(0);
  let lastBallSpawnTime = performance.now();

  const handleJump = () => {
    const player = playerRef.current;
    if (player.onGround && !gameOver && !victory) {
      player.vy = -15;
      player.onGround = false;
    }
  };

  const resetGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);

    const player = playerRef.current;
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - 80 - player.height;
    player.vy = 0;
    player.onGround = true;

    ballsRef.current = [];
    particlesRef.current = [];
    lastBallSpawnTime = performance.now();
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
    setVictory(false);

    animationIdRef.current = requestAnimationFrame(gameLoopRef.current);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleJump();
      }
    };
    const handleMouseDown = () => handleJump();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [gameOver, victory]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ground = canvas.height - 80;

    video.play().catch(() => {
      console.warn("Autoplay blocked — user interaction required.");
    });

    const player = playerRef.current;
    player.x = canvas.width / 2 - player.width / 2;
    player.y = ground - player.height;

    const spawnBall = () => {
      const px = player.x + player.width / 2;
      const py = player.y + player.height / 2;
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const speed = 2.5;

      const dx = px - x;
      const dy = py - y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      ballsRef.current.push({
        x,
        y,
        radius: 15,
        vx: (dx / dist) * speed,
        vy: (dy / dist) * speed,
      });
    };

    const spawnExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 60,
          color,
        });
      }
    };

    const ballSpawnInterval = 2000;

    const gameLoop = () => {
      const now = performance.now();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      player.vy += 0.5;
      player.y += player.vy;
      if (player.y >= ground - player.height) {
        player.y = ground - player.height;
        player.vy = 0;
        player.onGround = true;
      }

      if (now - lastBallSpawnTime >= ballSpawnInterval) {
        spawnBall();
        lastBallSpawnTime = now;
      }

      for (let i = ballsRef.current.length - 1; i >= 0; i--) {
        const b = ballsRef.current[i];
        b.x += b.vx;
        b.y += b.vy;

        const dx = b.x - (player.x + player.width / 2);
        const dy = b.y - (player.y + player.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < b.radius + player.width / 2) {
          if (player.onGround && !victory) {
            spawnExplosion(player.x + 25, player.y, "#ff0044");
            setGameOver(true);
            ctx.globalCompositeOperation = "source-over";
            return;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = "#ff0044";
        ctx.shadowColor = "#ff0044";
        ctx.shadowBlur = 20;
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        if (b.y - b.radius > canvas.height) {
          ballsRef.current.splice(i, 1);
          scoreRef.current++;
          setScore(scoreRef.current);
          if (scoreRef.current >= 10 && !victory) {
            setVictory(true);
            spawnExplosion(player.x, player.y, "#00ffcc");
            ctx.globalCompositeOperation = "source-over";
            return;
          }
        }
      }

      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("🐇", player.x + player.width / 2, player.y + player.height);

      ctx.font = "24px Orbitron, sans-serif";
      ctx.fillStyle = "#0ff";
      ctx.shadowColor = "#0ff";
      ctx.shadowBlur = 15;
      ctx.fillText(`Score: ${scoreRef.current}`, 120, 60);
      ctx.shadowBlur = 0;

      if (!gameOver && !victory) {
        animationIdRef.current = requestAnimationFrame(gameLoop);
      }
    };

    gameLoopRef.current = gameLoop;
    animationIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [gameOver, victory]);

  return {
    canvasRef,
    videoRef,
    score,
    gameOver,
    victory,
    resetGame,
  };
}
