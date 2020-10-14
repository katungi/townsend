import { BrowserWindow, dialog } from 'electron';
import { promises } from 'fs';
const fs = require('fs');

// Handle file read/write related events here for the electron side.
// Most of this should happen on the react side though
export class FileService {
  public openFile(browserWindow: BrowserWindow): void {
    // Opens file dialog and selects them
    const files = dialog.showOpenDialogSync(browserWindow, {
      properties: ['openFile'],
      filters: [
        {
          name: 'All Files',
          extensions: ['*'],
        },
      ],
    });

    // If there are no files
    if (!files) return;
    console.log(files);
    const directoryString = files[0];
    const fileContent: string = fs.readFileSync(directoryString).toString();
    console.log(fileContent);

    const sendCode = () => {
      if (browserWindow) {
        browserWindow.webContents.send('fileContent', {
          message: fileContent,
        });
      }
    };
  }

  public openFolder(browserWindow: BrowserWindow): void {
    const folders = dialog.showOpenDialogSync(browserWindow, {
      properties: ['openDirectory']
    });

    if (!folders) return;
    console.log(folders);
    // const directoryString = folders[0];
    const generateFileTreeObject = (directoryString = folders[0]) => {
      return fs.readdirAsync(directoryString).then((arrayOfFileNameStrings: any[]) => {
        const fileDataPromises = arrayOfFileNameStrings.map(fileNameString => {
          const fullPath = `${directoryString}/${fileNameString}`;
          return fs.statAsync(fullPath).then((fileData: { isFile: () => any; }) => {
            const file: any = {};
            file.filePath = fullPath;
            file.isFileBoolean = fileData.isFile();

            if (!file.isFileBoolean) {
              return generateFileTreeObject(file.filePath).then((fileNamesSubArray: any) => {
                file.files = fileNamesSubArray;
              })
              .catch(console.error);
            }
            return file;
          });
        });
        return Promise.all(fileDataPromises);
      });
    };
  }
}
