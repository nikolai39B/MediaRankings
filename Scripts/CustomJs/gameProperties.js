class GameProperties {
    // Game properties
    _properties = null;    
    get properties() {
        if (!this._properties) {
            this._properties = Object.freeze({
                name: new customJS.FileMetadata.Property({ name: "name", display: "Name" }),
                tier: new customJS.FileMetadata.Property({ name: "tier", display: "Tier" }),
                rank: new customJS.FileMetadata.Property({ name: "rank", display: "#" }),
                image: new customJS.FileMetadata.Property({ name: "image", display: "Image" }),
            });
        }
        return this._properties;
    }

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