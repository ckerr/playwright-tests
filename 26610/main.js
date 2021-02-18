const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", () => app.quit());
