const steamgriddbApiKey = "f1e243af8c47d40bbeb98e311407cc79";
const gameImagesLocation = "Games/Images/";

console.log("import steamgriddb_utils.js v.1");

export async function downloadDefaultImage(gameName) {	
	// Search for the game ID
	var uriGameName = encodeURIComponent(gameName);
	const gameSearchResponse = await requestUrl({ 
		url: "https://www.steamgriddb.com/api/v2/search/autocomplete/" + uriGameName, 
		headers: { Authorization: `Bearer ${steamgriddbApiKey}` } 
	});
	if (!gameSearchResponse.json.success || gameSearchResponse.json.data.length === 0) {
		return "";
	}
	var gameId = gameSearchResponse.json.data[0].id;
	
	// Get the game images
	const gameGridsResponse = await requestUrl({ 
		url: `https://www.steamgriddb.com/api/v2/grids/game/${gameId}`, 
		headers: { Authorization: `Bearer ${steamgriddbApiKey}` } 
	});
	if (!gameGridsResponse.json.success || gameGridsResponse.json.data.length === 0) {
		return "";
	}
	
	// Return the first image which is a png or jpg
	var imageUrl = ""
	for (const grid of gameGridsResponse.json.data) {
		if (grid.url.endsWith(".png") || grid.url.endsWith(".jpg")) {
			imageUrl = grid.url;
			break;
		}
	}
	if (imageUrl === "") {
		return "";
	}
	
	console.log(imageUrl)
	
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
	var imagePath = gameImagesLocation + imageName;
	
	// Download the file
    const response = await requestUrl({ url: imageUrl });
    await app.vault.adapter.writeBinary(imagePath, response.arrayBuffer);
	
	return imagePath;
}
