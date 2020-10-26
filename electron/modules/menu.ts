import { app, BrowserWindow, MenuItemConstructorOptions } from 'electron';
import { getFiles, getFolder } from './file';

// new instances of the files and folder classes
const getfile = new getFiles();
const getfolder  = new getFolder();

// Handle menu ad related items here
export class MenuBar {
  public getMenuItemTemplate(browserWindow: BrowserWindow): MenuItemConstructorOptions[] {
    const template: MenuItemConstructorOptions[] = [
      {
        label: 'File',
        submenu: [
          {
            label: 'Open Folder',
            accelerator: 'CmdOrCtrl+O',
            click() {
              getfolder.openFolder(browserWindow);
            },
          },
          {
            label: 'Open File',
            accelerator: 'CmdOrCtrl+p',
            click() {
              getfile.openFile(browserWindow);
            }
          },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
        ],
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
      { role: 'window', submenu: [{ role: 'minimize' }, { role: 'close' }] },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              require('electron').shell.openExternal('https://electron.atom.io');
            },
          },
        ],
      },
      {
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      },
    ];

    return template;
  }
}
