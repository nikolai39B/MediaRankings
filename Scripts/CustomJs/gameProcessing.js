class GameProcessing {
    get steamGridDbApiKey() { return "f1e243af8c47d40bbeb98e311407cc79" }
    get gameFilesLocation() { return "Games/Games/" }
    get gameImagesLocation() { return "Games/Images/" }

    //-- TOP LEVEL PROCESSING APIS
    async processTopGames() {
        const file = customJS.FileUtils.getFileFromPath("Games/Lists/Top Games.yaml");
        const data = await customJS.YamlFileUtils.parseYamlFile(file);
        await this.#processTopGameData(data);
    }

    async processTopGamesYear(year) {        
        const file = customJS.FileUtils.getFileFromPath(`Games/Lists/Top Games ${year}.yaml`);
        const data = await customJS.YamlFileUtils.parseYamlFile(file);
        await this.#processTopGamesYearData(data, year);
    }

    
    //-- TOP LEVEL DATA PROCESSING
    async #processTopGameData(data) {
        let nextRank = 1;

        // Process each game tier
        for (const [tier, gameNames] of Object.entries(data)) {            
            nextRank = await this.#processGameTier(tier, gameNames, nextRank);
        }
    }

    async #processGameTier(tier, gameNames, nextRank) {
        // Process each game
        for (const gameName of gameNames) {
            // Validate
            if (!this.#validateGameName(gameName)) {
                continue;
            }

            // Build the file
            let fileProperties = [];
            const gameFile = await this.#processGameFile(gameName, fileProperties);

            // Add the tier and rank
            this.#addProperty(customJS.GameProperties.properties.tier, tier, fileProperties);
            this.#addProperty(customJS.GameProperties.properties.rank, nextRank++, fileProperties);

            // Process the image
            await this.#processGameImage(gameName, gameFile, fileProperties)

            // Apply the properties
            await customJS.FileUtils.setPropertyValues(gameFile, fileProperties);
        }

        return nextRank;
    }

    async #processTopGamesYearData(data, year) {
        // Unpack the data
        const top10Data = data["Top 10"];
        const hmData = data["Honorable Mentions"];

        // Process the data
        if (top10Data) {
            this.#processYearTop10(year, top10Data)
        }
        if (hmData) {
            this.#processYearHonorableMentions(year, hmData)
        }
    }

    async #processYearTop10(year, gameNames) {
        // Process each game
        let nextRank = 1;
        for (const gameName of gameNames) {
            // Validate
            if (!this.#validateGameName(gameName)) {
                continue;
            }

            // Build the file
            let fileProperties = [];
            const gameFile = await this.#processGameFile(gameName, fileProperties);

            // Add the year and rank
            this.#addProperty(customJS.GameProperties.properties.year, year, fileProperties);
            this.#addProperty(customJS.GameProperties.properties.yearRank, nextRank++, fileProperties);

            // Process the image
            await this.#processGameImage(gameName, gameFile, fileProperties)

            // Apply the properties
            await customJS.FileUtils.setPropertyValues(gameFile, fileProperties);
        }
    }

    async #processYearHonorableMentions(year, gameNames) {
        // Process each game
        for (const gameName of gameNames) {
            // Validate
            if (!this.#validateGameName(gameName)) {
                continue;
            }

            // Build the file
            let fileProperties = [];
            const gameFile = await this.#processGameFile(gameName, fileProperties);

            // Add the year (no rank for honorable mentions)
            this.#addProperty(customJS.GameProperties.properties.year, year, fileProperties);

            // Process the image
            await this.#processGameImage(gameName, gameFile, fileProperties)

            // Apply the properties
            await customJS.FileUtils.setPropertyValues(gameFile, fileProperties);
        }
    }


    //-- PROCESSING UTILS / HELPERS
    #validateGameName(gameName) {
        const isString = typeof gameName === "string";
        if (!isString) {
            console.log(gameName);
            console.log("... is not a string");
        }

        return isString;
    }

    #addProperty(property, value, fileProperties) {
        fileProperties.push(new customJS.FileMetadata.PropertyValuePair({
            property: property,
            value: value
        }));
    }

    async #processGameFile(gameName, fileProperties) {
        // Build the game file name
        let gameFileName = gameName.replaceAll(":", "");
        gameFileName = this.gameFilesLocation + gameFileName + ".md";

        // Get the file / create if necessary
        let gameFile = app.vault.getFileByPath(gameFileName);		
        if (gameFile == null) {
            gameFile = await app.vault.create(gameFileName, "")
        }

        // Add the game name property
        this.#addProperty(customJS.GameProperties.properties.name, gameName, fileProperties);

        return gameFile;
    }

    async #processGameImage(gameName, gameFile, fileProperties) {	
        // If the game already has an image, nothing to do
        const gameImagePropertyValue = customJS.FileUtils.getPropertyValue(gameFile, customJS.GameProperties.properties.image);
        if (gameImagePropertyValue) {
            return null;
        }

		// Search for the game ID
		var uriGameName = encodeURIComponent(gameName);
		const gameSearchResponse = await requestUrl({ 
			url: "https://www.steamgriddb.com/api/v2/search/autocomplete/" + uriGameName, 
			headers: { Authorization: `Bearer ${this.steamGridDbApiKey}` } 
		});
		if (!gameSearchResponse.json.success || gameSearchResponse.json.data.length === 0) {
			return null;
		}
		var gameId = gameSearchResponse.json.data[0].id;
		
		// Get the game images
		const gameGridsResponse = await requestUrl({ 
			url: `https://www.steamgriddb.com/api/v2/grids/game/${gameId}`, 
			headers: { Authorization: `Bearer ${this.steamGridDbApiKey}` } 
		});
		if (!gameGridsResponse.json.success || gameGridsResponse.json.data.length === 0) {
			return null;
		}

		const filters = [
			// Only allow png or jpg images
			(grid) => grid.url.endsWith(".png") || grid.url.endsWith(".jpg"),
			(grid) => grid.height == 900 && grid.width == 600
		];
		
		// Return the first image which passes the filters
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
		console.log(`Loaded image for ${gameName}: ${imageUrl}`);

        // Add the property
        this.#addProperty(customJS.GameProperties.properties.image, "[[" + imagePath + "]]", fileProperties);
        return imageUrl;
	}
}