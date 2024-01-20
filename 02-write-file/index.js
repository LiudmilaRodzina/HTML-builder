// const fs = require('fs');
// const path = require('path');
// const readline = require('readline');

// const inputFile = fs.createWriteStream(
//   path.resolve(__dirname, 'input-file.txt'),
// );

// const question = 'Enter your text or type "exit" for exiting the programm: ';
// console.log(question);

// const readInput = readline.createInterface(process.stdin, process.stdout);

// readInput.on('line', (answer) => {
//   if (answer.toLowerCase() === 'exit') {
//     console.log('Exiting...');
//     readInput.close();
//   } else {
//     inputFile.write(answer + '\n');
//     console.log(question);
//   }
// });

// readInput.on('close', () => console.log('Have a great day and see you later!'));

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const question = 'Enter your text or type "exit" to exit the program: ';
const exitCommand = 'exit';
const farewellMsg = 'Have a great day and see you later!';
let exit = false;

const inputFile = fs.createWriteStream(
  path.resolve(__dirname, 'input-file.txt'),
);

console.log(question);

const readInput = readline.createInterface(process.stdin, process.stdout);

readInput.on('line', (answer) => {
  if (answer.toLowerCase() === exitCommand) {
    console.log(farewellMsg);
    exit = true;
    readInput.close();
  } else {
    inputFile.write(answer + '\n');
  }
});

readInput.on('close', () => {
  if (!exit) {
    console.log(farewellMsg);
  }
});
