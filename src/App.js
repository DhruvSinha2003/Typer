import React, { useRef, useEffect, useState } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [currentWord, setCurrentWord] = useState(generateRandomWordList(1)[0]);
  const [score, setScore] = useState(0);
  const containerRef = useRef(null);
  const wordBlockRef = useRef(null);
  const [gameState, setGameState] = useState("in-progress");
  const [shouldResetAnimation, setShouldResetAnimation] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  useEffect(() => {
    let intervalId;

    if (gameState === "in-progress") {
      intervalId = setInterval(() => {
        if (
          wordBlockRef.current &&
          containerRef.current &&
          wordBlockRef.current.offsetLeft + wordBlockRef.current.offsetWidth >=
            containerRef.current.getBoundingClientRect().width * 0.745
        ) {
          console.log("Word-block has reached the limit!");
          setGameState("game-over");
          if (wordBlockRef.current) {
            wordBlockRef.current.style.animationPlayState = "paused";
          }
        } else {
          if (score > 0 && score % 5 === 0) {
            setAnimationSpeed((prevSpeed) => prevSpeed * 1.01);
          }
        }
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [gameState, wordBlockRef, containerRef, score, shouldResetAnimation]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTryAgain = () => {
    setGameState("in-progress");
    setScore(0);
    setCurrentWord(generateRandomWordList(1)[0]);
    setAnimationSpeed(1); // Reset the animation speed
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
            className={`word-block run-animation`}
            style={{ animationDuration: `${7 / animationSpeed}s` }}
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
