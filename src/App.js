import React from "react";
import "./App.css";
const { wordList, generateRandomWordList } = require("./components/Wordlist");

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [currentWord, setCurrentWord] = React.useState(generateRandomWordList(1)[0]);
  const [score, setScore] = React.useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmittedWord();
    }
  };

  const handleSubmittedWord = () => {
    console.log("Current word:", currentWord);
    console.log("Input value:", inputValue);
    if (typeof currentWord !== "string") {
      console.error("currentWord is not a string:", currentWord);
      return;
    }
    if(inputValue.trim() === currentWord.trim()) {
      setScore(score + 1);
      setInputValue("");
      setCurrentWord(generateRandomWordList(1)[0]);
    }
  };
  

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <div className="word-block">{currentWord}</div>
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
    </div>
  );
}

export default App;
