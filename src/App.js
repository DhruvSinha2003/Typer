const {wordList, generateRandomWordList} = require('./components/Wordlist');
function App() {
  return (
    <div className="App">
      {generateRandomWordList(5).map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
}

export default App;
