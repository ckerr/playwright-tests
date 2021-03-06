const { electron  } = require('playwright-electron');
const each = require('jest-each').default;
const path = require('path')

const issueNumber = path.basename(path.dirname(__dirname));
 
describe(issueNumber, function () {
  const bugVersion = 'electron-12-0-0-beta-21';
  const fixVersion = 'electron-12-0-0-beta-24';
  const successResult = 'success';

  // runs in the Electron renderer process
  const getTestResult = async () => {
    return new Promise (resolve => {
      const timeout = setInterval(() => {
        if (global.hasOwnProperty('testResult')) {
          clearInterval(timeout);
          resolve(global.testResult);
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
      result = e.toString();
    }
    if (app) {
      await app.close();
    }
    return result;
  };

  const maxTestTimeMsec = 30 * 1000;

  it(`fails in ${bugVersion}`,
    async() => {
      const result = await runTest(bugVersion);
      expect(result).not.toBe(successResult);
    },
    maxTestTimeMsec
  );

  it(`works in ${fixVersion}`,
    async() => {
      const result = await runTest(fixVersion);
      expect(result).toBe(successResult);
    },
    maxTestTimeMsec
  );
});
