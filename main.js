const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "BloxdVR Client",
    icon: path.join(__dirname, 'assets/icons/favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // IMPORTANT: This enables VR support in the Electron window
      enableWebXR: true 
    }
  });

  // Load the Bloxd.io game
  mainWindow.loadURL('https://bloxd.io');

  // Inject your BloxdVR logic after the page loads
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      console.log("BloxdVR: Injecting VR Toolkit...");
      // Your injector.js code goes here
    `);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
