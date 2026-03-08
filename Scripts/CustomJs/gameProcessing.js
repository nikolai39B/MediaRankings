class GameProcessing {
    constructor () {
        this.topGamesFilePath = "Games/Lists/Top Games.yaml";
        this.gameFilesLocation = "Games/Games/";
		this.gameImagesLocation = "Games/Images/";
		this.steamGridDbApiKey = "f1e243af8c47d40bbeb98e311407cc79";
    }

    async processTopGames() {
        const topGamesFile = customJS.FileUtils.getFileFromPath(this.topGamesFilePath);
        const gameData = await customJS.YamlFileUtils.parseYamlFile(topGamesFile, customJS.obsidian);
        await this.processGameData(gameData);
    }

    async processGameData(gameData) {
        let nextRank = 1;

        // Process each game tier
        for (const [tier, gameNames] of Object.entries(gameData)) {            
            nextRank = await this.#processGameTier(tier, gameNames, nextRank);
        }
    }

    async #processGameTier(tier, gameNames, nextRank) {
        // Process each game
        for (const gameName of gameNames) {
            // Build the game file name
            let gameFileName = gameName.replaceAll(":", "");
            gameFileName = this.gameFilesLocation + gameFileName + ".md";

            // Get the file / create if necessary
            let gameFile = app.vault.getFileByPath(gameFileName);		
            if (gameFile == null) {
                gameFile = await app.vault.create(gameFileName, "")
            }

            // Build the properties
            let gameFilePropertyValues = [
                new customJS.FileMetadata.PropertyValuePair({
                    property: customJS.GameProperties.properties.name,
                    value: gameName
                }),
                new customJS.FileMetadata.PropertyValuePair({
                    property: customJS.GameProperties.properties.tier,
                    value: tier
                }),
                new customJS.FileMetadata.PropertyValuePair({
                    property: customJS.GameProperties.properties.rank,
                    value: nextRank++
                })
            ];
            
            // Download a default image if necessary
            //let gameImagePropertyValue = customJS.FileUtils.getPropertyValue(gameFile, customJS.GameProperties.properties.image);
            //if (!gameImagePropertyValue) {
            //    const imagePath = await this.#downloadDefaultImage(gameName);
            //    if (imagePath) {
            //        gameFilePropertyValues.push(
            //            new customJS.FileMetadata.PropertyValuePair({
            //                property: customJS.GameProperties.properties.image,
            //                value: "[[" + imagePath + "]]"
            //            })
            //        );
            //    }
            //}

            // Apply the properties
            customJS.FileUtils.setPropertyValues(gameFile, gameFilePropertyValues);
        }
    }
	
    async #downloadDefaultImage(gameName) {	
		// Search for the game ID
		var uriGameName = encodeURIComponent(gameName);
		const gameSearchResponse = await requestUrl({ 
			url: "https://www.steamgriddb.com/api/v2/search/autocomplete/" + uriGameName, 
			headers: { Authorization: `Bearer ${this.steamGridDbApiKey}` } 
		});
		if (!gameSearchResponse.json.success || gameSearchResponse.json.data.length === 0) {
			return "";
		}
		var gameId = gameSearchResponse.json.data[0].id;
		
		// Get the game images
		const gameGridsResponse = await requestUrl({ 
			url: `https://www.steamgriddb.com/api/v2/grids/game/${gameId}`, 
			headers: { Authorization: `Bearer ${this.steamGridDbApiKey}` } 
		});
		if (!gameGridsResponse.json.success || gameGridsResponse.json.data.length === 0) {
			return "";
		}

		const filters = [
			// Only allow png or jpg images
			(grid) => grid.url.endsWith(".png") || grid.url.endsWith(".jpg") 
		];
		
		// Return the first image which is a png or jpg
		var imageUrl = ""
		for (const grid of gameGridsResponse.json.data) {
			const passes = filters.every(filter => filter(grid));
			if (passes) {
				imageUrl = grid.url;
				break;
			}
		}
		if (imageUrl === "") {
			return "";
		}
		
		console.log(`Loaded image: ${imageUrl}`);
		
		// Build the name of the file
		var imageName = gameName.replaceAll(":", "");
		imageName = imageName.replaceAll(" ", "_");
		imageName = imageName.toLowerCase();
		if (imageUrl.endsWith(".png")) {
			imageName += ".png";
		} else if (imageUrl.endsWith(".jpg")) {
			imageName += ".jpg";
		} else {
			console.log("invalid image extension");
			return "";
		}
		var imagePath = this.gameImagesLocation + imageName;
		
		// Download the file
		const response = await requestUrl({ url: imageUrl });
		await app.vault.adapter.writeBinary(imagePath, response.arrayBuffer);
		
		return imagePath;
	}
}