# List
```base
filters:
  and:
    - file.inFolder("Games/Games")
formulas:
  Rank Title: file.properties["rank"] + " " + file.properties["name"]
  Year Rank Title: file.properties["YearRank"] + " " + file.properties["Name"]
properties:
  note.Rank:
    displayName: "#"
  file.name:
    displayName: Game
  note.rank:
    displayName: "#"
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
      - file.name
    sort:
      - property: rank
        direction: ASC
    columnSize:
      note.rank: 62
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