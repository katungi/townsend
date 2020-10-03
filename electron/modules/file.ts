import { BrowserWindow, dialog } from 'electron';
import * as fs from 'fs';

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

    // IF there are no files
    if (!files) return;
    console.log(files);
    const file = files[0];
    const fileContent: string = fs.readFileSync(file).toString();
    console.log(fileContent);

    const sendCode = () => {
      if (browserWindow) {
        browserWindow.webContents.send('fileContent', {
          message: fileContent,
        });
      }
    };
  }
}
