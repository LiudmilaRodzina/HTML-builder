const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true })
  .then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        const fileExt = path.extname(file.name).slice(1);
        const fileName = file.name.replace(fileExt, '').slice(0, -1);
        fs.stat(`./03-files-in-folder/secret-folder/${file.name}`)
          .then((stats) => {
            console.log(`${fileName} - ${fileExt} - ${stats.size}b`);
          })
          .catch((err) => console.log(err));
      }
    });
  })
  .catch((err) => console.log(err));
