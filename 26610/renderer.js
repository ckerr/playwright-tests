const { app, remote } = require("electron");

try {
  const primaryDisplay = remote.screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  document.querySelector("#size").textContent = `${width}×${height}`;
  global.testResult = 'success';
} catch (e) {
  global.testResult = e.toString();
}

