---
status: Complete
effort_actual: 34
effort_projected:
external_ids:
  - PES-383251
  - PR11396825
  - NX1234
tags:
  - scripts
  - jsengine
_location: Scripts/JsEngine
_resolved: false
_creation_date: 2026-03-05
_external_links:
  - "[PES-383251](https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/PES2/workitem?id=PES-383251)"
  - "[PR11396825](https://tac.industrysoftware.automation.siemens.com/prs/11396825/overview)"
_formatted_effort: 34 / --
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
