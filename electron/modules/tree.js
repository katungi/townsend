const fs = require('fs')

const generateFileTreeObject = directoryString => {  
    return fs.readdirAsync(directoryString)
      .then(arrayOfFileNameStrings => {
        const fileDataPromises = arrayOfFileNameStrings.map(fileNameString => {
          const fullPath = `${directoryString}/${fileNameString}`;
          return fs.statAsync(fullPath)
            .then(fileData => {
              const file = {};
              file.filePath = fullPath;
              file.isFileBoolean = fileData.isFile();
              /*Here is where we'll do our recursive call*/
              if (!file.isFileBoolean) {
                return generateFileTreeObject(file.filePath)
                  .then(fileNamesSubArray => {
                    file.files = fileNamesSubArray;
                  })
                  .catch(console.error);
              }
              /*End recursive condition*/
              return file;
            });
        });
        return Promise.all(fileDataPromises);
      });
  };
  module.exports = generateFileTreeObject;