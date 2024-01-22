const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const stylesFolder = path.resolve(__dirname, 'styles');
const stylesBundleFile = fs.createWriteStream(
  path.resolve(__dirname, 'project-dist/bundle.css'),
);

const readFiles = () => {
  return fsPromises
    .readdir(stylesFolder, { withFileTypes: true })
    .then((files) => {
      const stylesFile = files.map((file) => {
        if (file.isFile() && path.extname(file.name) === '.css') {
          return writeFile(file);
        }
      });
      return Promise.all(stylesFile);
    })
    .catch((err) => {
      console.error(err);
    });
};

const writeFile = (file) => {
  return fsPromises
    .readFile(path.resolve(stylesFolder, file.name), 'utf-8')
    .then((line) => {
      stylesBundleFile.write(`${line}\n`);
      return Promise.resolve();
    })
    .catch((err) => {
      console.error(err);
    });
};

readFiles();
