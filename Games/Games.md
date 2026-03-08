# List
```base
filters:
  and:
    - file.inFolder("Games/Games")
formulas:
  Rank Title: file.properties["Rank"] + " " + file.properties["Name"]
  Year Rank Title: file.properties["YearRank"] + " " + file.properties["Name"]
properties:
  note.Rank:
    displayName: "#"
  file.name:
    displayName: Game
views:
  - type: cards
    name: Cards
    order:
      - formula.Rank Title
    sort:
      - property: rank
        direction: ASC
    image: note.Image
    imageFit: contain
    imageAspectRatio: 1.5
  - type: table
    name: Table
    groupBy:
      property: tier
      direction: ASC
    order:
      - Rank
      - Name
    sort:
      - property: rank
        direction: ASC
    columnSize:
      note.rank: 83
  - type: cards
    name: Year Top 10
    filters:
      and:
        - Year == "2025"
    order:
      - formula.Year Rank Title
    image: note.Image
    imageFit: contain
    imageAspectRatio: 1.5

```