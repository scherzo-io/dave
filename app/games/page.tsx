"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Card data (all 50 cards, categorized)
const domSubCards = [
  { type: "Dom/Sub", title: "Punish the Disobedient", task: "Choose a player to be your Sub. Spank them with your hand or paddle 5 times.", points: 7 },
  { type: "Dom/Sub", title: "Crawl to Me", task: "Pick a player to crawl toward you on their hands and knees.", points: 6 },
  { type: "Dom/Sub", title: "Stand at Attention", task: "Choose a Sub. Have them stand naked (or in their underwear) in front of you for 2 minutes while you inspect them. Both earn points if they comply.", points: 8 },
  { type: "Dom/Sub", title: "Gagged Obedience", task: "Gag your Sub with a ball gag or makeshift gag (if available). They must remain silent for the next round. Both earn points if they comply.", points: 6 },
  { type: "Dom/Sub", title: "Pleasure Denial", task: "Choose a Sub and deny them physical touch for the next two rounds, even if they beg.", points: 7 },
  { type: "Dom/Sub", title: "Worship My Body", task: "Command your Sub to worship your body (kiss or lick any consensual area) for 2 minutes.", points: 8 },
  { type: "Dom/Sub", title: "Sub's Kiss", task: "Order your Sub to kiss you anywhere you choose.", points: 6 },
  { type: "Dom/Sub", title: "Bind and Serve", task: "Bind your Sub's hands behind their back and have them serve you a drink or perform a task. Both earn points if they succeed.", points: 8 },
  { type: "Dom/Sub", title: "Stand Still", task: "Choose a Sub and order them to stand perfectly still while you tease them with a feather, toy, or your hands for 2 minutes.", points: 7 },
  { type: "Dom/Sub", title: "Dom's Command", task: "Choose a player to be your Sub. They must perform oral service (or simulate it fully clothed) for 2 minutes. Both earn points if they obey without hesitation.", points: 9 },
];
const truthCards = [
  { type: "Truth", title: "Most Intense Scene", task: "Describe the most intense BDSM scene you've ever been a part of or would like to experience.", points: 6 },
  { type: "Truth", title: "Kinkiest Fantasy", task: "Share the kinkiest sexual fantasy you've had.", points: 5 },
  { type: "Truth", title: "Public Pleasure", task: "Have you ever engaged in sexual activity in public or fantasized about it? Where, and what happened?", points: 6 },
  { type: "Truth", title: "Toys of Choice", task: "What's your favorite sex toy, and how do you like to use it?", points: 5 },
  { type: "Truth", title: "First BDSM Experience", task: "Share the story of your first experience with BDSM, either as a Dom or Sub.", points: 5 },
  { type: "Truth", title: "Fantasies Unfulfilled", task: "What's a BDSM or sexual fantasy you've always wanted to fulfill but haven't yet?", points: 6 },
  { type: "Truth", title: "Most Embarrassing Moment", task: "What's your most embarrassing moment during a sexual encounter or BDSM scene?", points: 5 },
  { type: "Truth", title: "Public Display of Affection", task: "Have you ever been caught during a sexual act in public? Describe what happened.", points: 6 },
  { type: "Truth", title: "Safeword Story", task: "Have you ever had to use a safeword during a BDSM scene? What happened?", points: 5 },
  { type: "Truth", title: "Best Sub Experience", task: "If you've been a Sub before, what was your favorite experience of giving up control? If not, what would you want it to be like?", points: 6 },
];
const dareCards = [
  { type: "Dare", title: "Tied & Teased", task: "Bind a player's wrists and tease their body with a feather, toy, or your hands for 3 minutes.", points: 8 },
  { type: "Dare", title: "Edge Play", task: "Choose a player and edge them for 3 minutes using your hands or a toy. Both earn points if they remain on the edge without orgasming.", points: 10 },
  { type: "Dare", title: "Public Strip", task: "Strip down to your underwear or less and perform a seductive dance in front of the group for 2 minutes.", points: 7 },
  { type: "Dare", title: "Orgasm Control", task: "Use a vibrator or your hands to bring a consenting player to the brink of orgasm, but don't let them finish.", points: 10 },
  { type: "Dare", title: "Impact Play", task: "Spank a player with a paddle or your hand up to 10 times.", points: 8 },
  { type: "Dare", title: "Submission Dance", task: "Command a player to dance for you erotically, using their body to please you for 2 minutes.", points: 7 },
  { type: "Dare", title: "Hands-Free Pleasure", task: "Use a toy (vibrator, dildo, or other) on yourself or another player without using your hands. Both earn points if the pleasure is visible.", points: 9 },
  { type: "Dare", title: "Vibrating Tease", task: "Use a vibrator on yourself or a consenting player for 3 minutes. Earn points if the toy is used to its full potential.", points: 8 },
  { type: "Dare", title: "Pleasure Denial", task: "Blindfold a player and deny them touch while teasing them verbally or with soft touches.", points: 6 },
  { type: "Dare", title: "Deepthroat Sim", task: "Simulate deepthroat oral sex on a dildo or another player for 1 minute.", points: 7 },
];
const actionCards = [
  { type: "Action", title: "Blindfolded Caress", task: "Blindfold another player and use your hands or a toy to explore their body for 2 minutes.", points: 7 },
  { type: "Action", title: "Vibrator Challenge", task: "Use a vibrator on yourself or another player and maintain constant pleasure for 3 minutes.", points: 9 },
  { type: "Action", title: "Rope Bondage", task: "Tie another player's wrists and ankles using rope and tease them with a toy for 3 minutes.", points: 10 },
  { type: "Action", title: "Nipple Play", task: "Use nipple clamps or your mouth to tease another player's nipples for 2 minutes.", points: 8 },
  { type: "Action", title: "Control & Dominate", task: "Use a collar and leash on a player for the next round. Lead them around and command their movements.", points: 9 },
  { type: "Action", title: "Tease and Deny", task: "Use a vibrator or your hands to edge a player, keeping them on the brink for 2 minutes without letting them orgasm.", points: 10 },
  { type: "Action", title: "Body Worship", task: "Command another player to worship your body, kissing or licking consensual areas for 2 minutes. Both earn points if the worship is sincere.", points: 8 },
  { type: "Action", title: "Impact with Restraint", task: "Restrain a player's hands and spank them 5 times with a paddle. Both earn points if they enjoy the experience.", points: 8 },
  { type: "Action", title: "Collared Pleasure", task: "Place a collar on a player and use a toy on them for 3 minutes. Both earn points if the collar remains in place.", points: 9 },
  { type: "Action", title: "Forced Orgasm", task: "Use a vibrator or toy to bring yourself or another player to orgasm in front of the group. Earn points if the orgasm is achieved within 3 minutes.", points: 10 },
];
const roleplayCards = [
  { type: "Roleplay", title: "Dom & Slave", task: "You are the Dom. Command your Sub (choose a player) to perform oral or manual service on you for 3 minutes. Both earn points if they obey without hesitation.", points: 10 },
  { type: "Roleplay", title: "Punishment Scene", task: "You are the Master/Mistress. Choose a player to be your Sub and punish them (with spanking or verbal humiliation) for disobedience. Both earn points if the scene is convincing.", points: 10 },
  { type: "Roleplay", title: "Pleasure Slave", task: "Command your Sub to kneel and worship your body with their mouth for 2 minutes.", points: 9 },
  { type: "Roleplay", title: "Submission Test", task: "You are the Dom. Command your Sub to remain completely still while you tease their body with your hands or a toy for 3 minutes.", points: 9 },
  { type: "Roleplay", title: "Humiliation Play", task: "You are the Dom. Verbally humiliate your Sub (chosen player) for 2 minutes, focusing on their obedience and submission. Both earn points if the Sub handles the humiliation without complaint.", points: 8 },
  { type: "Roleplay", title: "Servant's Reward", task: "Your Sub (chosen player) must serve you for the next round. Reward them with pleasure (using your hands or a toy) if they serve you well. Both earn points if the service and reward are completed.", points: 9 },
  { type: "Roleplay", title: "The Inspection", task: "As the Dom, order your Sub to strip and stand for inspection. Inspect their body for 3 minutes, using your hands or a toy. Earn points if the Sub remains compliant and respectful.", points: 10 },
  { type: "Roleplay", title: "Master's Pet", task: "Choose a player to act as your 'pet.' They must crawl on the floor and serve you as a pet would for 2 minutes (using a collar, leash, or hands). Both earn points if the roleplay is convincingly performed.", points: 8 },
  { type: "Roleplay", title: "Punishment & Reward", task: "Act as the Master/Mistress and create a scenario where your Sub earns a reward through obedience. If they fail, they must be punished. Both earn points if the scene is completed with proper intensity.", points: 9 },
  { type: "Roleplay", title: "Control Over Pleasure", task: "You are the Dom, and your Sub must beg for permission to orgasm. Use a toy or your hands to edge them for 3 minutes. Both earn points if the Sub remains obedient and doesn't climax without permission.", points: 10 },
];

const allCards = [
  ...domSubCards,
  ...truthCards,
  ...dareCards,
  ...actionCards,
  ...roleplayCards,
];

type Card = {
  type: string;
  title: string;
  task: string;
  points: number;
};

function shuffleDeck(deck: Card[]): Card[] {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const diceTypes = [
  { key: 'd4', sides: 4, icon: '🟦' },
  { key: 'd6', sides: 6, icon: '🎲' },
  { key: 'd8', sides: 8, icon: '🛑' },
  { key: 'd10', sides: 10, icon: '🔟' },
  { key: 'd12', sides: 12, icon: '🧊' },
  { key: 'd20', sides: 20, icon: '🧊' },
  { key: 'd100', sides: 100, icon: '💯' },
] as const;
type DiceType = typeof diceTypes[number]['key'];

export default function SinsOfThePlayer() {
  const [step, setStep] = useState<'setup'|'dice'|'play'|'bonus'|'end'>('setup');
  const [players, setPlayers] = useState<string[]>([]);
  const [playerInput, setPlayerInput] = useState('');
  const [scores, setScores] = useState<number[]>([]);
  const [deck, setDeck] = useState(() => shuffleDeck(allCards));
  const [currentCard, setCurrentCard] = useState<number>(-1);
  const [turn, setTurn] = useState(0);
  const [safeWord, setSafeWord] = useState('RED');
  const [hardLimits, setHardLimits] = useState('');
  const [timer, setTimer] = useState<number|null>(null);
  const [showCard, setShowCard] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState<number|null>(null);
  const [diceRolls, setDiceRolls] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);
  const [bonusCards, setBonusCards] = useState<Card[]>([]);
  const [bonusTurn, setBonusTurn] = useState(0);
  const [showBonusCard, setShowBonusCard] = useState(false);
  const [cardTimer, setCardTimer] = useState<number|null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout|null>(null);
  const [diceType, setDiceType] = useState<DiceType>('d6');
  const [diceRolling, setDiceRolling] = useState(false);
  const [diceResult, setDiceResult] = useState<number|null>(null);
  const diceAudio = useRef<HTMLAudioElement|null>(null);
  const [showDicePanel, setShowDicePanel] = useState(false);

  // Prevent zoom on double tap for mobile
  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchstart', preventZoom, { passive: false });
    return () => document.removeEventListener('touchstart', preventZoom);
  }, []);

  // Player setup
  function addPlayer() {
    if (playerInput.trim() && !players.includes(playerInput.trim())) {
      setPlayers([...players, playerInput.trim()]);
      setPlayerInput('');
    }
  }
  function removePlayer(idx:number) {
    setPlayers(players.filter((_, i) => i !== idx));
  }
  function startGame() {
    if (players.length >= 2) {
      setScores(Array(players.length).fill(0));
      setDeck(shuffleDeck(allCards));
      setCurrentCard(-1);
      setTurn(0);
      setStep('play');
    }
  }

  // Card drawing and turn logic
  function drawCard() {
    setCurrentCard((prev) => prev + 1);
    setShowCard(true);
    setPointsAwarded(null);
  }
  function nextTurn(points:number|null) {
    if (points !== null) {
      setScores((prev) => prev.map((s, i) => i === turn ? s + points : s));
    }
    setShowCard(false);
    setPointsAwarded(null);
    resetCardTimer();
    if (currentCard + 1 >= deck.length) {
      setStep('end');
    } else {
      setTurn((prev) => (prev + 1) % players.length);
      setCurrentCard((prev) => prev + 1);
    }
  }

  // Game end
  function restart() {
    setStep('setup');
    setPlayers([]);
    setScores([]);
    setDeck(shuffleDeck(allCards));
    setCurrentCard(-1);
    setTurn(0);
    setSafeWord('RED');
    setHardLimits('');
    setShowCard(false);
    setPointsAwarded(null);
  }

  // Dice roll for turn order
  function rollDice() {
    setRolling(true);
    setTimeout(() => {
      const rolls = players.map(() => Math.ceil(Math.random() * 20));
      setDiceRolls(rolls);
      setRolling(false);
    }, 800);
  }
  function confirmTurnOrder() {
    // Find highest roll, handle ties
    const max = Math.max(...diceRolls);
    const indices = diceRolls.map((r, i) => r === max ? i : -1).filter(i => i !== -1);
    if (indices.length === 1) {
      // Reorder players and scores so highest goes first
      const first = indices[0];
      const newPlayers = [players[first], ...players.filter((_, i) => i !== first)];
      setPlayers(newPlayers);
      setScores(Array(players.length).fill(0));
      setTurn(0);
      setStep('play');
    } else {
      // Tie: reroll for tied players
      const tiedPlayers = indices.map(i => players[i]);
      setPlayers(tiedPlayers);
      setScores(Array(tiedPlayers.length).fill(0));
      setDiceRolls([]);
      setTurn(0);
      setTimeout(rollDice, 500);
    }
  }

  // Timer for timed cards
  function extractMinutes(text: string): number|null {
    const match = text.match(/(\d+)\s*minute/);
    return match ? parseInt(match[1], 10) : null;
  }
  function startCardTimer(minutes: number) {
    setCardTimer(minutes * 60);
    setTimerRunning(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCardTimer(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          setTimerRunning(false);
          if (timerRef.current) clearInterval(timerRef.current);
          // Vibrate on timer end if supported
          if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  function stopCardTimer() {
    setTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }
  function resetCardTimer() {
    setCardTimer(null);
    setTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  // Bonus round logic
  function startBonusRound() {
    // Each player draws a card
    const used = new Set(deck.slice(0, currentCard + 2).map(c => c.title));
    let available = allCards.filter(c => !used.has(c.title));
    if (available.length < players.length) available = allCards;
    const drawn = shuffleDeck(available).slice(0, players.length);
    setBonusCards(drawn);
    setBonusTurn(0);
    setShowBonusCard(false);
    setStep('bonus');
  }
  function showNextBonusCard() {
    setShowBonusCard(true);
  }
  function awardBonusPoints(points: number) {
    setScores(prev => prev.map((s, i) => i === bonusTurn ? s + points : s));
    setShowBonusCard(false);
    if (bonusTurn + 1 < players.length) {
      setBonusTurn(bonusTurn + 1);
    } else {
      setStep('end');
    }
  }

  function rollGameDice() {
    setDiceRolling(true);
    // Vibrate on roll if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    // Play sound if in browser
    if (typeof window !== 'undefined' && diceAudio.current) {
      diceAudio.current.currentTime = 0;
      diceAudio.current.play().catch(() => {}); // Catch autoplay errors
    }
    const sides = diceTypes.find(d => d.key === diceType)?.sides || 6;
    setTimeout(() => {
      setDiceResult(Math.ceil(Math.random() * sides));
      setDiceRolling(false);
    }, 600);
  }

  // Get card type color
  function getCardTypeColor(type: string) {
    switch(type) {
      case 'Dom/Sub': return 'bg-red-600';
      case 'Truth': return 'bg-blue-600';
      case 'Dare': return 'bg-purple-600';
      case 'Action': return 'bg-green-600';
      case 'Roleplay': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  }

  // UI
  return (
    <div className="min-h-screen bg-black flex flex-col px-4 py-6 select-none">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-pink-400 text-3xl font-bold text-center">Sins of the Player</h1>
        {step !== 'setup' && (
          <div className="flex flex-col items-center mt-3 space-y-1">
            <div className="text-red-400 text-sm font-semibold">Safe Word: {safeWord}</div>
            {hardLimits && <div className="text-yellow-300 text-xs">Limits: {hardLimits}</div>}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {step === 'setup' && (
          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 shadow-xl max-w-md mx-auto w-full">
            <div className="text-gray-200 text-center mb-2">
              <p className="text-sm mb-1">A BDSM card game for 2-6 players</p>
              <p className="text-xs text-red-400 font-semibold">Explicit content. 18+ only.</p>
            </div>
            
            {/* Player Input */}
            <div>
              <label className="text-gray-200 text-sm mb-2 block">Enter Player Names (2-6):</label>
              <div className="flex gap-2">
                <input 
                  className="flex-1 p-3 rounded-xl bg-gray-800 text-white text-base" 
                  value={playerInput} 
                  onChange={e => setPlayerInput(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && addPlayer()} 
                  placeholder="Add player..." 
                  maxLength={20} 
                />
                <button 
                  className="bg-pink-500 px-6 py-3 rounded-xl text-white font-bold active:scale-95 transition-transform"
                  onClick={addPlayer}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Player List */}
            <div className="flex flex-wrap gap-2">
              {players.map((p, i) => (
                <div key={i} className="bg-gray-700 px-4 py-2 rounded-xl text-white flex items-center gap-2">
                  <span>{p}</span>
                  <button className="text-red-400 text-xl font-bold" onClick={() => removePlayer(i)}>×</button>
                </div>
              ))}
            </div>

            {/* Safe Word */}
            <div>
              <label className="text-gray-200 text-sm mb-2 block">Set Safe Word:</label>
              <input 
                className="w-full p-3 rounded-xl bg-gray-800 text-white text-base" 
                value={safeWord} 
                onChange={e => setSafeWord(e.target.value)} 
                maxLength={20} 
              />
            </div>

            {/* Hard Limits */}
            <div>
              <label className="text-gray-200 text-sm mb-2 block">Set Hard Limits (optional):</label>
              <input 
                className="w-full p-3 rounded-xl bg-gray-800 text-white text-base" 
                value={hardLimits} 
                onChange={e => setHardLimits(e.target.value)} 
                placeholder="e.g., no marks, no photos"
                maxLength={100} 
              />
            </div>

            {/* Start Buttons */}
            <div className="space-y-3 mt-4">
              <button 
                className="w-full bg-green-600 px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform disabled:opacity-50"
                onClick={startGame} 
                disabled={players.length < 2}
              >
                Quick Start
              </button>
              <button 
                className="w-full bg-blue-600 px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform disabled:opacity-50"
                onClick={() => { if (players.length >= 2) setStep('dice'); }} 
                disabled={players.length < 2}
              >
                Roll for Turn Order
              </button>
            </div>
          </div>
        )}

        {step === 'dice' && (
          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 shadow-xl max-w-md mx-auto w-full">
            <h2 className="text-pink-300 text-2xl font-bold text-center mb-4">Roll for Turn Order</h2>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {players.map((p, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-xl text-center">
                  <div className="text-white font-semibold mb-1">{p}</div>
                  <div className="text-yellow-300 text-3xl font-bold">
                    {diceRolls[i] !== undefined ? diceRolls[i] : '?'}
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="w-full bg-pink-500 px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform"
              onClick={rollDice} 
              disabled={rolling}
            >
              {rolling ? 'Rolling...' : 'Roll D20'}
            </button>
            
            {diceRolls.length === players.length && !rolling && (
              <button 
                className="w-full bg-green-600 px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform"
                onClick={confirmTurnOrder}
              >
                Start Game
              </button>
            )}
          </div>
        )}

        {step === 'play' && (
          <div className="flex flex-col h-full">
            {/* Player Status Bar */}
            <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-bold">
                  <span className="text-gray-400">Turn:</span>
                  <span className="text-pink-400 ml-2">{players[turn]}</span>
                </div>
                <div className="text-sm text-gray-400">
                  Card {currentCard + 2}/{deck.length}
                </div>
              </div>
              
              {/* Score Display */}
              <div className="grid grid-cols-2 gap-2">
                {players.map((p, i) => (
                  <div 
                    key={i} 
                    className={`px-3 py-2 rounded-lg text-center transition-all ${
                      i === turn ? 'bg-pink-500 text-white transform scale-105' : 'bg-gray-800 text-gray-200'
                    }`}
                  >
                    <div className="font-semibold text-sm">{p}</div>
                    <div className="text-lg">{scores[i] || 0} pts</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Area */}
            <div className="flex-1 flex items-center justify-center px-2">
              {!showCard ? (
                <button 
                  className="bg-pink-500 px-12 py-8 rounded-2xl text-white font-bold text-2xl active:scale-95 transition-transform shadow-xl"
                  onClick={drawCard}
                >
                  Draw Card
                </button>
              ) : deck[currentCard + 1] && (
                <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
                  {/* Card Header */}
                  <div className={`${getCardTypeColor(deck[currentCard + 1].type)} -m-6 mb-4 px-6 py-3 rounded-t-2xl`}>
                    <div className="text-white text-center">
                      <div className="text-sm font-semibold opacity-90">{deck[currentCard + 1].type}</div>
                      <div className="text-xl font-bold">{deck[currentCard + 1].title}</div>
                    </div>
                  </div>

                  {/* Task */}
                  <div className="text-white text-base leading-relaxed mb-4">
                    {deck[currentCard + 1].task}
                  </div>

                  {/* Points */}
                  <div className="text-center mb-4">
                    <span className="text-yellow-300 text-2xl font-bold">{deck[currentCard + 1].points} Points</span>
                  </div>

                  {/* Timer Section */}
                  {extractMinutes(deck[currentCard + 1].task) && (
                    <div className="bg-gray-900 rounded-xl p-4 mb-4">
                      <div className="text-center mb-2">
                        <div className="text-yellow-300 text-3xl font-bold font-mono">
                          {Math.floor((cardTimer ?? extractMinutes(deck[currentCard + 1].task)! * 60) / 60)}:
                          {((cardTimer ?? extractMinutes(deck[currentCard + 1].task)! * 60) % 60).toString().padStart(2, '0')}
                        </div>
                        {cardTimer === 0 && (
                          <div className="text-red-400 font-bold animate-pulse">Time's up!</div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!timerRunning ? (
                          <button 
                            className="flex-1 bg-blue-500 px-4 py-3 rounded-xl text-white font-bold active:scale-95 transition-transform"
                            onClick={() => startCardTimer(extractMinutes(deck[currentCard + 1].task)!)}
                          >
                            Start Timer
                          </button>
                        ) : (
                          <button 
                            className="flex-1 bg-gray-600 px-4 py-3 rounded-xl text-white font-bold active:scale-95 transition-transform"
                            onClick={stopCardTimer}
                          >
                            Pause
                          </button>
                        )}
                        <button 
                          className="bg-gray-700 px-4 py-3 rounded-xl text-white font-bold active:scale-95 transition-transform"
                          onClick={resetCardTimer}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button 
                      className="w-full bg-green-600 px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform"
                      onClick={() => nextTurn(deck[currentCard + 1].points)}
                    >
                      Complete (+{deck[currentCard + 1].points})
                    </button>
                    <button 
                      className="w-full bg-yellow-500 px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform"
                      onClick={() => nextTurn(Math.floor(deck[currentCard + 1].points / 2))}
                    >
                      Partial (+{Math.floor(deck[currentCard + 1].points / 2)})
                    </button>
                    <button 
                      className="w-full bg-gray-600 px-6 py-4 rounded-xl text-white font-bold active:scale-95 transition-transform"
                      onClick={() => nextTurn(0)}
                    >
                      Skip (Safe Word)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="flex gap-3 mt-4">
              <button 
                className="flex-1 bg-purple-600 px-4 py-3 rounded-xl text-white font-bold active:scale-95 transition-transform flex items-center justify-center gap-2"
                onClick={() => setShowDicePanel(!showDicePanel)}
              >
                <span className="text-xl">🎲</span>
                <span>Dice</span>
              </button>
              <Link 
                href="/" 
                className="bg-gray-700 px-6 py-3 rounded-xl text-white font-bold active:scale-95 transition-transform flex items-center"
              >
                Exit
              </Link>
            </div>
          </div>
        )}

        {step === 'end' && (
          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 shadow-xl max-w-md mx-auto w-full">
            <h2 className="text-pink-400 text-3xl font-bold text-center mb-4">Game Over!</h2>
            
            {/* Final Scores */}
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <h3 className="text-gray-200 text-lg font-semibold mb-3 text-center">Final Scores</h3>
              <div className="space-y-2">
                {players
                  .map((p, i) => ({ name: p, score: scores[i] || 0, index: i }))
                  .sort((a, b) => b.score - a.score)
                  .map((player, rank) => (
                    <div 
                      key={player.index} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        rank === 0 ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {rank === 0 ? '👑' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : ''}
                        </span>
                        <span className="font-semibold">{player.name}</span>
                      </div>
                      <span className="font-bold text-lg">{player.score} pts</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Buttons */}
            <button 
              className="w-full bg-pink-500 px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform"
              onClick={restart}
            >
              Play Again
            </button>
            <Link 
              href="/" 
              className="w-full bg-gray-700 px-6 py-4 rounded-xl text-white font-bold text-lg active:scale-95 transition-transform text-center"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Dice Panel */}
      {showDicePanel && (step === 'play' || step === 'bonus' || step === 'end') && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-end" onClick={() => setShowDicePanel(false)}>
          <div 
            className="bg-gray-900 rounded-t-3xl p-6 w-full shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6"></div>
            
            <h3 className="text-pink-300 text-xl font-bold text-center mb-4">Roll Dice</h3>
            
            {/* Dice Type Selection */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {diceTypes.map(d => (
                <button
                  key={d.key}
                  className={`p-3 rounded-xl font-bold flex flex-col items-center gap-1 active:scale-95 transition-all ${
                    diceType === d.key ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300'
                  }`}
                  onClick={() => setDiceType(d.key)}
                  disabled={diceRolling}
                >
                  <span className="text-2xl">{d.icon}</span>
                  <span className="text-xs">{d.key.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Roll Button */}
            <button
              className="w-full bg-pink-500 px-6 py-5 rounded-xl text-white font-bold text-xl mb-4 active:scale-95 transition-transform"
              onClick={rollGameDice}
              disabled={diceRolling}
            >
              {diceRolling ? 'Rolling...' : `Roll ${diceType.toUpperCase()}`}
            </button>

            {/* Result Display */}
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-yellow-300 text-5xl font-bold">
                {diceResult !== null && !diceRolling ? diceResult : '?'}
              </div>
            </div>

            {/* Close Button */}
            <button
              className="w-full bg-gray-700 px-6 py-4 rounded-xl text-white font-bold mt-4 active:scale-95 transition-transform"
              onClick={() => setShowDicePanel(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Dice Audio */}
      <audio ref={diceAudio} src="https://cdn.pixabay.com/audio/2022/10/16/audio_12c6b6b6b6.mp3" preload="auto" />

      {/* Footer Info */}
      {step === 'setup' && (
        <div className="mt-6 text-xs text-gray-500 text-center max-w-md mx-auto">
          <p className="mb-2"><b>Safety First:</b> Always respect consent, boundaries, and safe words.</p>
          <details className="text-left">
            <summary className="cursor-pointer text-center font-semibold">Required Items</summary>
            <p className="mt-2 px-4">
              Blindfold, feather, restraints, rope, vibrator, dildo, massage oil, paddle, collar/leash, nipple clamps, gag, timer
            </p>
          </details>
        </div>
      )}
    </div>
  );
} 