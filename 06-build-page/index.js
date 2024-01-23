const fsPromises = require('fs').promises;
const path = require('path');

const distFolder = path.join(__dirname, 'project-dist');
const templateHtml = path.join(__dirname, 'template.html');
const htmlFolder = path.join(__dirname, 'components');
const distHtmlFile = path.join(distFolder, 'index.html');
const stylesFolder = path.join(__dirname, 'styles');
const distStylesFile = path.join(distFolder, 'style.css');
const assetsFolder = path.resolve(__dirname, 'assets');
const distAssetsFolder = path.resolve(distFolder, 'assets');

// HTML
const createDistHtml = () => {
  return fsPromises
    .readdir(htmlFolder, { withFileTypes: true })
    .then((files) => {
      return fsPromises.readFile(templateHtml, 'utf-8').then((string) => {
        const promises = files.map((file) => {
          const htmlFileName = path.parse(file.name).name;
          const htmlFilePath = path.join(htmlFolder, file.name);
          return fsPromises
            .readFile(htmlFilePath, 'utf-8')
            .then((htmlFileContent) => {
              string = string.replaceAll(
                `{{${htmlFileName}}}`,
                htmlFileContent,
              );
            });
        });
        return Promise.all(promises).then(() => {
          return fsPromises.writeFile(distHtmlFile, string);
        });
      });
    })
    .catch((err) => console.error(err));
};
createDistHtml();

// CSS
const readCssFiles = () => {
  return fsPromises
    .readdir(stylesFolder, { withFileTypes: true })
    .then((files) => {
      const stylesFile = files.map((file) => {
        if (file.isFile() && path.extname(file.name) === '.css') {
          return createDistCss(file);
        }
      });
      return Promise.all(stylesFile);
    })
    .catch((err) => {
      console.error(err);
    });
};
const createDistCss = (file) => {
  return fsPromises
    .readFile(path.resolve(stylesFolder, file.name), 'utf-8')
    .then((string) => {
      return fsPromises.writeFile(distStylesFile, `${string}\n`, {
        flag: 'a',
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
readCssFiles();

// ASSETS
const copyAssets = (assetsFolder, distAssetsFolder) => {
  return fsPromises
    .rm(distAssetsFolder, { recursive: true, force: true })
    .then(() => fsPromises.mkdir(distAssetsFolder, { recursive: true }))
    .then(() => fsPromises.readdir(assetsFolder, { withFileTypes: true }))
    .then((files) => {
      const promises = files.map((file) => {
        const asset = path.join(assetsFolder, file.name);
        const assetDist = path.join(distAssetsFolder, file.name);

        if (file.isDirectory()) {
          return copyAssets(asset, assetDist);
        } else {
          return fsPromises.copyFile(asset, assetDist);
        }
      });
      return Promise.all(promises);
    })
    .catch((err) => console.error(err));
};
copyAssets(assetsFolder, distAssetsFolder);
