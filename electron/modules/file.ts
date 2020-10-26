import { BrowserWindow, dialog } from 'electron';
import { promises } from 'fs';
const fs = require('fs');
import generateFileTreeObject from './tree';

// Handle file read/write related events here for the electron side.
// Most of this should happen on the react side though
export class getFiles {
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

    // send the file contents to the editor
    const sendCode = () => {
      if (browserWindow) {
        browserWindow.webContents.send('fileContent', {
          message: fileContent,
        });
      }
    };
  }
}

export class getFolder {
  public openFolder(browserWindow: BrowserWindow): void {
    const folders = dialog.showOpenDialogSync(browserWindow, {
      properties: ['openDirectory']
    });

    if (!folders) return;
    console.log(folders);
    generateFileTreeObject(folders);   
  }
}