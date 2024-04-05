import React, { useRef, useEffect } from "react";
import "./App.css";

const { generateRandomWordList } = require("./components/Wordlist");

const GameOverScreen = ({ score, onTryAgain }) => {
  console.log("GameOverScreen rendered");
  return (
    <div className="game-over-screen">
      <div className="game-over-content">
        <h2>Game Over</h2>
        <p>Your score: {score}</p>
        <button onClick={onTryAgain}>Try Again</button>
      </div>
    </div>
  );
};

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [currentWord, setCurrentWord] = React.useState(generateRandomWordList(1)[0]);
  const [score, setScore] = React.useState(0);
  const containerRef = useRef(null);
  const wordBlockRef = useRef(null);
  const [gameState, setGameState] = React.useState("in-progress");
  const [shouldResetAnimation, setShouldResetAnimation] = React.useState(false);

  useEffect(() => {
    let intervalId;

    if (gameState === "in-progress") {
      intervalId = setInterval(() => {
        if (
          wordBlockRef.current &&
          containerRef.current &&
          wordBlockRef.current.offsetLeft >=
            containerRef.current.getBoundingClientRect().width * 0.75 - wordBlockRef.current.offsetWidth
        ) {
          console.log("Word-block has reached the limit!");
          setGameState("game-over");
          if (wordBlockRef.current) {
            wordBlockRef.current.style.animationPlayState = "paused"; // Pause the animation
          }
        }
      }, 100); // Check the position every 100ms
    }

    return () => clearInterval(intervalId);
  }, [gameState, wordBlockRef, containerRef, shouldResetAnimation]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTryAgain = () => {
    setGameState("in-progress");
    setScore(0);
    setCurrentWord(generateRandomWordList(1)[0]);
    if (wordBlockRef.current) {
      wordBlockRef.current.style.left = "0"; // Reset the position of the word-block
      wordBlockRef.current.style.animationPlayState = "running"; // Resume the animation
    }
    setShouldResetAnimation(!shouldResetAnimation); // Toggle the value to trigger a rerender and reset the animation
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmittedWord();
    }
  };

  const handleSubmittedWord = () => {
    if (inputValue.trim() === currentWord.trim()) {
      setScore(score + 1);
      setInputValue("");
      setCurrentWord(generateRandomWordList(1)[0]);
      // Reset the animation
      if (wordBlockRef.current) {
        wordBlockRef.current.style.animationName = "none";
        void wordBlockRef.current.offsetWidth; // Trigger reflow to restart animation
        wordBlockRef.current.style.animationName = "run";
      }
    } else {
      console.log("Invalid word entered");
      setGameState("game-over");
      if (wordBlockRef.current) {
        wordBlockRef.current.style.animationPlayState = "paused"; // Pause the animation
      }
    }
  };

  const handleAnimationEnd = () => {
    if (wordBlockRef.current) {
      wordBlockRef.current.style.left = "0"; // Reset the position of the word-block
    }
  };

  return (
    <div className="App">
      <div className="container" ref={containerRef}>
        <div className="left">
          <div
            ref={wordBlockRef}
            className="word-block run-animation"
            onAnimationEnd={handleAnimationEnd}
          >
            {currentWord}
          </div>
        </div>
        <div className="limit"></div>
        <div className="right">
          <div className="score">
            <div className="score-title">
              <h3>Score</h3>
            </div>
            <div className="score-value">
              <h1>{score}</h1>
            </div>
          </div>
          <div className="enter">
            <input
              type="text"
              placeholder="Enter the word"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
      {gameState === "game-over" && (
        <GameOverScreen score={score} onTryAgain={handleTryAgain} />
      )}
    </div>
  );
}

export default App;