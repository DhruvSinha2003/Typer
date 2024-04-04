// wordList.js

const wordList = [
    "apple",
    "banana",
    "orange",
    "grape",
    "pear",
  ];
  
  // Function to generate a random integer between min (inclusive) and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to generate a random list of words of specified length
  function generateRandomWordList(length) {
    const randomWordList = [];
    const wordListLength = wordList.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(0, wordListLength - 1);
      randomWordList.push(wordList[randomIndex]);
    }
  
    return randomWordList;
  }
  
  module.exports = {
    wordList,
    generateRandomWordList
  };
  