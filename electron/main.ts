import { app, BrowserWindow, Menu } from 'electron';
import * as path from 'path';
import { MenuBar } from './modules/menu';

function createWindow() {
  const menuBar = new MenuBar();

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const template = menuBar.getMenuItemTemplate(mainWindow);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const indexUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : `file://${(path.join(__dirname), '../index.html')}`;

  mainWindow.loadURL(indexUrl);

  // Show devTools at launch: Good for debugging startup
  mainWindow.webContents.openDevTools();

  const isMac: boolean = process.platform === 'darwin';

  //  Not sure if it is necessary : https://github.com/electron/electron-quick-start-typescript/issues/35#issuecomment-589916378
  // mainWindow.on('closed', () => {
  //   mainWindow = null;
  // });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;

// Quit when all windows are closed, except on macOS: Where, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
