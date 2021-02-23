const { app, ipcMain, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    icon: undefined,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  win.loadFile('index.html')
});

function finishTest(result) {
  if (!Object.prototype.hasOwnProperty.call(global, 'testResult')) {
    global.testResult = result;
    console.log(`test result is ${global.testResult}`);
  }
}

ipcMain.on('set-test-result', (event, arg) => {
  console.log('set-test-result');
  finishTest(arg);
});

process.on('uncaughtException', (error) => {
  console.log('exception');
  finishTest(error.toString());
});
