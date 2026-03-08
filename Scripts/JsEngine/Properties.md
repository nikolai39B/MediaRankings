---
tags:
  - scripts
  - jsengine
---
```button
name Update Properties
type command
action QuickAdd: Update Properties
```



# jsengine 1
```js-engine
const file = app.workspace.getActiveFile();
await customJS.FileUtils.updateAutoProperties(file);
```
