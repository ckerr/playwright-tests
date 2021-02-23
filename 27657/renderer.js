// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//
console.log("RENDERER!")

const { ipcRenderer } = require("electron");
const remote = require('@electron/remote-1-0-2');


var browserWindow = remote.getCurrentWindow();

// As per the bug report, this is something that just occurs sometimes.
// The fix shows that it happens when premature GC occurs.
// 
// There is probably a more efficient (faster, more consistent) way to
// conduct this test, but a quick & dirty way to test is to run a handful
// of times to try & trigger the crash.
let numShots = 0;
const MaxShots = 20;

setTimeout(function(){
  setInterval(function(){
    console.log('frozen?')
  }, 1000);
}, 4000)


function takeScreenie(){
  console.log("====> TAKING SCREENSHOT!")
  browserWindow.capturePage()
    .then((nativeImage) => {
      console.log("<===== SCREENSHOT TAKEN!");
      if (++numShots <= MaxShots) {
        setTimeout(takeScreenie, 1000)
      } else {
        console.log('success!');
        ipcRenderer.send('set-test-result', 'success');
      }
    })
    .catch(function(err){
      console.error('-------->>>>>>>>>>> ERRRRRRRRRRRRRRR')
      console.error('-------->>>>>>>>>>> ERRRRRRRRRRRRRRR')
      console.error('-------->>>>>>>>>>> ERRRRRRRRRRRRRRR')
      console.error('-------->>>>>>>>>>> ERRRRRRRRRRRRRRR', err)
    });
}
setTimeout(takeScreenie, 3000);
