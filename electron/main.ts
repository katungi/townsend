import { app, BrowserWindow, Menu } from 'electron';
import { initSplashScreen, OfficeTemplate } from 'electron-splashscreen';
import isDev from 'electron-is-dev';
import { resolve } from 'app-root-path';
import * as path from 'path';
import { MenuBar } from './modules/menu';
import hideSplashscreen from './modules/splashscreen';

function createWindow() {
  const menuBar = new MenuBar();

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    },
    show: false
  });


  const hideSplashscreen = initSplashScreen({
    mainWindow,
    icon: isDev ? resolve('assets/icon.ico') : undefined,
    url: OfficeTemplate,
    width: 500,
    height: 300,
    brand: 'Ts Editor',
    productName: 'Townsend',
    logo: resolve('assets/logo.svg'),
    website: 'www.townsendeditor.io',
    text: 'Starting ...'
  });

  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show();
  //   hideSplashscreen();
  // });

  mainWindow.webContents.on('did-finish-load', ()=>{
    mainWindow.show();
    hideSplashscreen();
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
