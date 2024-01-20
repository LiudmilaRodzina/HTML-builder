const fs = require('fs');
const path = require('path');

const rf = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf8',
});

rf.on('data', (dataChunk) => {
  console.log(dataChunk);
});
