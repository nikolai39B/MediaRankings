console.log("jse_main");

// Import scripts
app.userScripts = {}
async function importUserScript(relativePath) {
	return await engine.importJs("Scripts/" + relativePath);
}
app.userScripts.fileUtils = await importUserScript("file_utils.js")
