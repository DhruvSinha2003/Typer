const wordListPath = require('word-list'); 
const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

export default wordArray;