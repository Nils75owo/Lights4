const electron = require('electron');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
	  title: '',
	  webPreferences: {
		  contextIsolation: true,
		  nodeIntigration: false,
	  }
  });
  mainWindow.on('closed', () => {app.quit()});
  mainWindow.loadFile(path.join(__dirname, 'src/index.html'));
  mainWindow.setFullScreen(true);
  //Menu.setApplicationMenu(null);
});
