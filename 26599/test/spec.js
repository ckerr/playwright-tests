const { electron  } = require('playwright-electron');
const each = require('jest-each').default;
const path = require('path')
 
describe('26599', function () {
  const bugVersion = 'electron-11-0-1';
  const fixVersion = 'electron-11-0-3';
  const successResult = 'success';

  // This runs in the Electron main process.
  // "electron" variable is the result of `require('electron')`.
  const getTestResult = async (electron) => {
    const { app } = electron;
    return new Promise (resolve => {
      setInterval(() => {
        if (app.hasOwnProperty('testResult')) {
          resolve(app.testResult);
        }
      }, 50);
    });
  };

  const runTest = async (electronVersion) => {
    const electronPath = require(electronVersion);
    let app;
    let result;
    // must try-catch; this can throw if Electron crashes
    try {
      app = await electron.launch(electronPath, {
        path: electronPath,
        args: [path.join(__dirname, '..', 'main.js')]
      });
      result = await app.evaluate(getTestResult);
    } catch (e) {
    }
    if (app) {
      await app.close();
    }
    return result;
  };

  it(`fails in ${bugVersion}`, async() => {
    const result = await runTest(bugVersion);
    expect(result).not.toBe(successResult);
  });

  it(`works in ${fixVersion}`, async() => {
    const result = await runTest(fixVersion);
    expect(result).toBe(successResult);
  });
});