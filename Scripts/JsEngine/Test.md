
```js-engine
const file = app.workspace.getActiveFile();
await customJS.FileUtils.updateAutoProperties(file);
console.log("done")
return "js_engine"
```