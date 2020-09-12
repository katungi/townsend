import { app, BrowserWindow , Menu} from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
 {/* TODO: FIX SUBMENU TYPE ERROR*/}
// const isMac = process.platform === 'darwin'
const template: Electron.MenuItemConstructorOptions[] = [{
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
{label: 'View',
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
}
];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
   
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;