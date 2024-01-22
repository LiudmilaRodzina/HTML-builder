const fs = require('fs').promises;
const path = require('path');

const initialFolder = path.resolve(__dirname, 'files');
const copiedFolder = path.resolve(__dirname, 'files-copy');

const createCopiedFolder = () => {
  deleteCopiedFolder()
    .then(createEmptyFolder)
    .then(copyFiles)
    .catch((err) => console.error(err));
};

const deleteCopiedFolder = () => {
  return fs
    .rm(copiedFolder, { force: true, recursive: true })
    .catch((err) => console.error(err));
};

const createEmptyFolder = () => {
  return fs
    .mkdir(copiedFolder, { recursive: true })
    .catch((err) => console.error(err));
};

const copyFiles = () => {
  return fs
    .readdir(initialFolder)
    .then((files) => {
      const copyFile = files.map((file) => {
        return fs.copyFile(
          path.resolve(initialFolder, file),
          path.resolve(copiedFolder, file),
        );
      });
      return Promise.all(copyFile);
    })
    .catch((err) => console.error(err));
};

createCopiedFolder();
