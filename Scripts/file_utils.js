//-- PROPERTIES
//---- ACCESSORS / MUTATORS
export function getProperty(file, propertyName) {
	const metadata = app.metadataCache.getFileCache(file);
	return metadata?.frontmatter?.[propertyName];
}

export async function setProperty(file, propertyName, val) {
	await app.fileManager.processFrontMatter(file, (fm) => {
		fm[propertyName] = val;
	});
}

export async function getLinkedFile(linkText, sourceFile) {
	const strippedLinkText = stripLinkDecoration(linkText)
	return await app.metadataCache.getFirstLinkpathDest(strippedLinkText, sourceFile.path);
}

export function stripLinkDecoration(linkText) {
	return linkText.replace(/^\[\[|\]\]$/g, "");
}

export async function parseYamlFile(file, obsidian) {
	const content = await app.vault.read(file);
	return obsidian.parseYaml(content);
}