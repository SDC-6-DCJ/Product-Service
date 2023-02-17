const fs = require('fs');

const readline = require('node:readline');

let count = 0;
let index = 0;

(function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./data/photos.csv')
    });

    rl.on('line', (line) => {
      index++;
      if (line[line.length - 1] !== '"' && index !== 1) {
        count++;
        console.log('problem with line number:', index)
      }
    });
  } catch (err) {
    console.error(err);
  }
})();
