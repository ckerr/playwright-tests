Project to reproduce exception stack member (bug?) in Electron 11.
==================================================================

```
npm install
npm run start
```

will show something like:
```
Error: there should be stack frames here:
```

then either change `contextIsolation` to `false` in `main.js` or change electron version to `10.1.6` in `package.json`.
```
npm install
npm run start
```
will then show something like:
```
Error: there should be stack frames here: at file:///C:/dev/electron_stack_test/printstack.js:1:17
```

I would have expected the printouts to be the same..