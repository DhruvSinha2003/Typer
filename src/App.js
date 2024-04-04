import "./App.css";
const { wordList, generateRandomWordList } = require("./components/Wordlist");
function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="left">
        <div className="word-block">{generateRandomWordList(1)}</div>
        </div>
        <div className="limit"></div>
        <div className="right">
          <div className="score">
            <h3>Score</h3>
            <h1>0</h1>
          </div>
          <div className="enter">
            <input type="text" placeholder="Enter the word" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
