class GameProperties {
    // Game properties
    _properties = null;
    get properties() {
        if (!this._properties) {
            this._properties = Object.freeze({
                name: new customJS.FileMetadata.Property({ name: "name", display: "Name" }),
                tier: new customJS.FileMetadata.Property({ name: "tier", display: "Tier" }),
                rank: new customJS.FileMetadata.Property({ name: "rank", display: "#" }),
                year: new customJS.FileMetadata.Property({ name: "year", display: "Year" }),
                yearRank: new customJS.FileMetadata.Property({ name: "year_rank", display: "#" }),
                image: new customJS.FileMetadata.Property({ name: "image", display: "Image" }),
            });
        }
        return this._properties;
    }

    // Year properties
    //_yearProperties = null;
    //get yearProperties() {
    //    if (!this._yearProperties) {
    //        this._yearProperties = {}
    //        this._yearProperties.hasYearRank = new customJS.FileMetadata.Property({ name: "has_year_rank", display: "" });
//
    //        // Note the first and last year of the range
    //        const firstYear = 2010;
    //        const lastYear = 2040;
//
    //        // Build the properties
    //        for (let yy = firstYear; yy <= lastYear; yy++) {
    //            const year = yy.toString();
    //            this._yearProperties[year] = new customJS.FileMetadata.Property({ name: year, display: year });
    //            this._yearProperties[`${year}Rank`] = new customJS.FileMetadata.Property({ name: `${year}_rank`, display: "#" });
    //        }
//
    //        // Freeze the properties
    //        this._yearProperties = Object.freeze(this._yearProperties);
    //    }
    //    return this._yearProperties;
    //}

    // Games list properties
    _listProperties = null;
    get listProperties() {
        if (!this._listProperties) {
            this._listProperties = Object.freeze({
                topGames: new customJS.FileMetadata.Property({ name: "top_games", display: "Top Games" }),
                topGames2026: new customJS.FileMetadata.Property({ name: "top_games_2026", display: "Top Games 2026" }),
            });
        }
        return this._listProperties;
    }
}