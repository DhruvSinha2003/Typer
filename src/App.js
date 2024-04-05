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
        <div class="right">
          <div class="score">
            <div class="score-title">
              <h3>Score</h3>
            </div>
            <div class="score-value">
              <h1>0</h1>
            </div>
          </div>
          <div class="enter">
            <input type="text" placeholder="Enter the word" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
