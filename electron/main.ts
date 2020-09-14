import { app, BrowserWindow, dialog,Menu, MenuItem } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { MenuItemConstructorOptions } from 'electron/main';
import fs from 'fs';


let mainWindow: Electron.BrowserWindow | null | any;

function createWindow() {
  mainWindow= new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }
  const isMac: boolean = process.platform === 'darwin'

  const template: Electron.MenuItemConstructorOptions[] | any = [
    {
      label: "File",
      submenu: [
        {
          label: "Open Folder",
          accelerator: "CmdOrCtrl+O",
          click() {
            openFile()
          }
        },
        {
          label: "Open File"
        }
      ]
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
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    { role: 'window', submenu: [{ role: 'minimize' }, { role: 'close' }] },
    {
      role: 'help',
      submenu: [{
        label: 'Learn More',
        click() {
          require('electron').shell.openExternal('https://electron.atom.io');
        }
      }]
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
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);


  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;

function openFile(){
  // Opens file dialog and selects them
  const files = dialog.showOpenDialogSync(mainWindow, {
    properties:['openFile'],
    filters: [{
      name: "All Files", extensions: ['*']
    }]
  });
  
  // IF there are no files
  if(!files) return;
  const file = files[0];
   const fileContent: string = fs.readFileSync(file).toString();
   console.log(fileContent)
}