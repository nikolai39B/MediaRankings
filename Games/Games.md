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
      - property: Rank
        direction: ASC
    image: note.Image
    imageFit: contain
    imageAspectRatio: 1.5
  - type: table
    name: Table
    groupBy:
      property: Tier
      direction: ASC
    order:
      - Rank
      - Name
    sort:
      - property: Rank
        direction: ASC
    columnSize:
      note.Rank: 62
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