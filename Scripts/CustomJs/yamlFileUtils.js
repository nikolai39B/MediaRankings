class YamlFileUtils { 
    async parseYamlFile(file, obsidian) {
        const content = await app.vault.read(file);
        return obsidian.parseYaml(content);
    }
}
