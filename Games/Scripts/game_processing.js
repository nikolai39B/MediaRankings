import { downloadDefaultImage } from "./steamgriddb_utils.js";

const gameFilesLocation = "Games/Games/";

console.log("import game_processing.js v.2");

export async function processGameData(gameList) {
	// Track the current tier and rank
	let currentTier = "";
	let rank = 1;
	
	for (const gameName of gameList) {
		// If this is a tier, handle it
		if (gameName.startsWith("__tier__")) {
			currentTier = gameName.replace("__tier__", "");
			continue;
		}
		
		// Build the game file name
		let gameFileName = gameName.replaceAll(":", "");
		gameFileName = gameFilesLocation + gameFileName + ".md";
		
		// Get the file / create if necessary
		let file = app.vault.getFileByPath(gameFileName);		
		if (file == null) {
			file = await app.vault.create(gameFileName, "")
		}
		//console.log(file)
		//console.log(rank)
		
		// Update the properties
		await app.fileManager.processFrontMatter(file, (frontmatter) => { 
			frontmatter["Name"] = gameName; 
			frontmatter["Rank"] = rank; 
			frontmatter["Tier"] = currentTier; 
		});
		
		// Download a default image if necessary
		let frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
		if (!frontmatter?.Image) {
		    const imagePath = await downloadDefaultImage(gameName);
            if (imagePath) {
                await app.fileManager.processFrontMatter(file, (frontmatter) => {
                    frontmatter["Image"] = "[[" + imagePath + "]]";
                });
            }
            //console.log(imagePath);
		}		
		
		// Increment for next loop
		rank++;
	};
}
