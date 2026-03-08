---
creation_date: 2026-03-06
_resolved: false
---

```js-engine
const file = app.workspace.getActiveFile();
await customJS.FileUtils.updateAutoProperties(file);
console.log("done")
return "js_engine"
```