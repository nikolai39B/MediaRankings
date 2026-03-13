# List
```base
filters:
  and:
    - file.inFolder("Games/Games")
formulas:
  Rank Title: file.properties["rank"] + " " + file.properties["name"]
  Year Rank Title: file.properties["year_rank"] + " " + file.properties["name"]
properties:
  file.name:
    displayName: Game
  note.rank:
    displayName: "#"
  note.year_rank:
    displayName: "#"
views:
  - type: cards
    name: Cards
    filters:
      and:
        - file.hasProperty("rank")
    order:
      - formula.Rank Title
    sort:
      - property: note.rank
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
    name: Year Cards
    filters:
      and:
        - file.hasProperty("year_rank")
        - year_rank != null
    groupBy:
      property: year
      direction: DESC
    order:
      - formula.Year Rank Title
    sort:
      - property: year_rank
        direction: ASC
    image: note.Image
    imageFit: contain
    imageAspectRatio: 1.5
  - type: table
    name: Year Table
    filters:
      and:
        - file.hasProperty("year")
    groupBy:
      property: year
      direction: DESC
    order:
      - note.year_rank
      - file.name
    sort:
      - property: year_rank
        direction: ASC
    columnSize:
      note.year_rank: 58
  - type: cards
    name: All Games
    image: note.Image
    imageFit: contain
    imageAspectRatio: 1.5

```