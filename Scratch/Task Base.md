# Base
```base
filters:
  and:
    - file.hasLink("Games/Games")
views:
  - type: table
    name: Table
```
# Base
```base
filters:
  and:
    - file.inFolder(this.file.folder)
    - file.hasProperty("status")
    - '!file.inFolder("Templates")'
formulas:
  Color: |-
    if(file.properties["Priority"] == 1, "#c00000", 
    if(file.properties["Priority"] == 2, "#c8c800", "#00c000"))
  Resolved: if(file.properties["Status"] == "Complete" || file.properties["Status"] == "Reassigned" || file.properties["Status"] == "Deferred" || file.properties["Status"] == "Dropped", "Yes", "No")
  test: |-
    if(file.properties["status"] == "in_review", "In Review",
    ""
    )
properties:
  file.name:
    displayName: Task
  note.effort_actual:
    displayName: Eff. (A)
  note.effort_projected:
    displayName: Eff. (P)
  note.priority:
    displayName: P
views:
  - type: cards
    name: Focused
    filters:
      and:
        - _resolved == false
        - or:
            - status == "in_progress"
            - note["due_date"] <= today() + duration("7d")
            - priority == 1
    groupBy:
      property: status
      direction: ASC
    order:
      - file.name
      - description
      - due_date
      - _external_links
      - tags
      - file.backlinks
      - file.basename
      - file.ctime
    sort:
      - property: due_date
        direction: ASC
      - property: priority
        direction: ASC
      - property: file.folder
        direction: ASC
      - property: due_date
        direction: DESC
    cardSize: 300
    image: formula.Color
    imageAspectRatio: 0.07
  - type: cards
    name: Due
    filters:
      and:
        - _resolved == false
        - or:
            - note["due_date"] <= today() + duration("7d")
    groupBy:
      property: due_date
      direction: ASC
    order:
      - file.name
      - description
      - _formatted_effort
      - due_date
      - formula.Links
      - tags
      - _location
    sort:
      - property: priority
        direction: ASC
      - property: file.folder
        direction: ASC
    cardSize: 300
    image: formula.Color
    imageAspectRatio: 0.07
  - type: table
    name: Unresolved
    filters:
      and:
        - _resolved == false
    groupBy:
      property: _creation_date
      direction: DESC
    order:
      - file.name
      - formula.test
      - priority
      - status
      - _formatted_effort
      - _external_links
      - description
    sort:
      - property: priority
        direction: ASC
      - property: file.folder
        direction: ASC
    summaries: {}
    columnSize:
      file.name: 268
      formula.test: 89
      note.priority: 57
      note.status: 116
      note._external_links: 142
    rowHeight: medium
  - type: table
    name: Resolved
    filters:
      and:
        - _resolved == true
    groupBy:
      property: _resolution_date
      direction: DESC
    order:
      - file.name
      - priority
      - status
      - effort_actual
      - effort_projected
      - _external_links
      - description
    sort:
      - property: priority
        direction: ASC
      - property: file.folder
        direction: ASC
    summaries: {}
    columnSize:
      file.name: 268
      note.priority: 57
      note.effort_actual: 77
      note.effort_projected: 76
    rowHeight: medium

```
