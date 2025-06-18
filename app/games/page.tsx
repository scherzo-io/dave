"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Games() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showDifficulty, setShowDifficulty] = useState(false);
  
  useEffect(() => {
    if (!gameStarted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Difficulty settings
    const difficultySettings = {
      easy: { ballSpeed: 2, computerSpeed: 3, paddleHeight: 120 },
      medium: { ballSpeed: 3, computerSpeed: 5, paddleHeight: 100 },
      hard: { ballSpeed: 4, computerSpeed: 7, paddleHeight: 80 }
    };
    
    const settings = difficultySettings[difficulty];
    
    // Game variables
    const ballSpeed = settings.ballSpeed;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballVX = ballSpeed;
    let ballVY = ballSpeed * 0.5;
    
    const paddleHeight = settings.paddleHeight;
    const paddleWidth = 15;
    const paddleSpeed = 10;
    let playerY = canvas.height / 2 - paddleHeight / 2;
    let computerY = canvas.height / 2 - paddleHeight / 2;
    
    let playerScore = score.player;
    let computerScore = score.computer;
    
    // Ball trail
    const ballTrail: { x: number, y: number, alpha: number }[] = [];
    
    // Keyboard state
    const keys: { [key: string]: boolean } = {};
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent page scrolling for arrow keys and space
      if (['ArrowUp', 'ArrowDown', ' ', 'p', 'P'].includes(e.key)) {
        e.preventDefault();
      }
      
      keys[e.key] = true;
      
      // Pause with space or P
      if ((e.key === ' ' || e.key === 'p' || e.key === 'P') && gameStarted) {
        setGamePaused(prev => !prev);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Game loop
    const gameLoop = () => {
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Full clear for UI elements
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, 100);
      
      // Draw center line
      ctx.setLineDash([10, 20]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 100);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.setLineDash([]);
      
      if (!gamePaused) {
        // Update player paddle (keyboard control)
        if (keys['ArrowUp'] && playerY > 0) {
          playerY -= paddleSpeed;
        }
        if (keys['ArrowDown'] && playerY < canvas.height - paddleHeight) {
          playerY += paddleSpeed;
        }
        playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));
        
        // Update computer paddle (AI with difficulty)
        const computerSpeed = settings.computerSpeed;
        const targetY = ballY - paddleHeight / 2;
        const diff = targetY - computerY;
        
        if (Math.abs(diff) > computerSpeed) {
          computerY += Math.sign(diff) * computerSpeed;
        } else {
          computerY = targetY;
        }
        computerY = Math.max(0, Math.min(canvas.height - paddleHeight, computerY));
        
        // Update ball position
        ballX += ballVX;
        ballY += ballVY;
        
        // Add to trail
        ballTrail.push({ x: ballX, y: ballY, alpha: 1 });
        if (ballTrail.length > 20) {
          ballTrail.shift();
        }
        
        // Ball collision with top/bottom walls
        if (ballY <= 15 || ballY >= canvas.height - 15) {
          ballVY = -ballVY;
        }
        
        // Ball collision with paddles
        // Player paddle
        if (ballX <= 35 && ballX >= 25 && ballY >= playerY && ballY <= playerY + paddleHeight) {
          ballVX = Math.abs(ballVX) * 1.05; // Speed up slightly on hit
          ballVY += (ballY - (playerY + paddleHeight / 2)) * 0.2;
          // Add particle effect
          for (let i = 0; i < 5; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
            ctx.fillRect(ballX + Math.random() * 20, ballY + (Math.random() - 0.5) * 20, 3, 3);
          }
        }
        
        // Computer paddle
        if (ballX >= canvas.width - 35 && ballX <= canvas.width - 25 && ballY >= computerY && ballY <= computerY + paddleHeight) {
          ballVX = -Math.abs(ballVX) * 1.05;
          ballVY += (ballY - (computerY + paddleHeight / 2)) * 0.2;
          // Add particle effect
          for (let i = 0; i < 5; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
            ctx.fillRect(ballX - Math.random() * 20, ballY + (Math.random() - 0.5) * 20, 3, 3);
          }
        }
        
        // Limit ball speed
        const maxSpeed = 8;
        ballVX = Math.max(-maxSpeed, Math.min(maxSpeed, ballVX));
        ballVY = Math.max(-maxSpeed, Math.min(maxSpeed, ballVY));
        
        // Score points
        if (ballX < 0) {
          computerScore++;
          setScore({ player: playerScore, computer: computerScore });
          ballX = canvas.width / 2;
          ballY = canvas.height / 2;
          ballVX = ballSpeed;
          ballVY = ballSpeed * 0.5;
          ballTrail.length = 0;
        } else if (ballX > canvas.width) {
          playerScore++;
          setScore({ player: playerScore, computer: computerScore });
          ballX = canvas.width / 2;
          ballY = canvas.height / 2;
          ballVX = -ballSpeed;
          ballVY = ballSpeed * 0.5;
          ballTrail.length = 0;
        }
      }
      
      // Draw ball trail
      ballTrail.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8 * (index / ballTrail.length), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${0.5 * (index / ballTrail.length)})`;
        ctx.fill();
      });
      
      // Draw paddles with glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#4AF';
      ctx.fillStyle = '#fff';
      ctx.fillRect(25, playerY, paddleWidth, paddleHeight);
      
      ctx.shadowColor = '#F44';
      ctx.fillRect(canvas.width - 40, computerY, paddleWidth, paddleHeight);
      ctx.shadowBlur = 0;
      
      // Draw ball with glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#FFF';
      ctx.beginPath();
      ctx.arc(ballX, ballY, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw scores
      ctx.font = 'bold 64px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#4AF';
      ctx.fillText(playerScore.toString(), canvas.width / 4, 80);
      ctx.fillStyle = '#F44';
      ctx.fillText(computerScore.toString(), 3 * canvas.width / 4, 80);
      
      // Draw pause indicator
      if (gamePaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px monospace';
        ctx.fillText('Press SPACE or P to resume', canvas.width / 2, canvas.height / 2 + 40);
      }
      
      // Check for game over
      if (playerScore >= 5 || computerScore >= 5) {
        setGameStarted(false);
        return;
      }
      
      requestAnimationFrame(gameLoop);
    };
    
    const animationId = requestAnimationFrame(gameLoop);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [gameStarted, gamePaused, difficulty, score]);
  
  const startGame = () => {
    setScore({ player: 0, computer: 0 });
    setGameStarted(true);
    setGamePaused(false);
    setShowDifficulty(false);
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-6xl font-bold mb-8">Ping Pong</h1>
      
      <div className="relative">
        <canvas 
          ref={canvasRef}
          width={1000}
          height={600}
          className="border-2 border-gray-700"
          style={{ 
            boxShadow: '0 0 50px rgba(100, 200, 255, 0.3)',
            background: 'radial-gradient(ellipse at center, #111 0%, #000 100%)'
          }}
        />
        
        {!gameStarted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90">
            <h2 className="text-white text-4xl mb-6">
              {score.player >= 5 ? '🎉 You Win! 🎉' : score.computer >= 5 ? '💔 Computer Wins! 💔' : 'Ping Pong Deluxe'}
            </h2>
            
            {!showDifficulty ? (
              <>
                <button
                  onClick={() => setShowDifficulty(true)}
                  className="text-white text-xl border-2 border-white px-8 py-3 hover:bg-white hover:text-black transition-all hover:scale-105 mb-4"
                >
                  {score.player > 0 || score.computer > 0 ? 'Play Again' : 'Start Game'}
                </button>
                <p className="text-white text-sm">Use ↑ and ↓ arrow keys to control the left paddle</p>
              </>
            ) : (
              <div className="text-center">
                <p className="text-white text-lg mb-4">Select Difficulty:</p>
                <div className="flex gap-4">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        setDifficulty(level);
                        startGame();
                      }}
                      className={`text-white text-lg border-2 px-6 py-2 transition-all hover:scale-105 ${
                        difficulty === level ? 'border-blue-400 bg-blue-900' : 'border-white hover:bg-white hover:text-black'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-white text-sm mb-2">
          Controls: ↑ Up | ↓ Down | SPACE/P Pause
        </p>
        <p className="text-gray-400 text-xs">First to 5 points wins! • Difficulty: {difficulty}</p>
      </div>
      
      <div className="mt-8">
        <Link 
          href="/"
          className="text-gray-300 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
} 