class FileUtils {
    //-- PROPERTY ACCESSORS / MUTATORS

    /**
     * Retrieves the value of a specific frontmatter property from a file.
     *
     * @param {TFile} file - The Obsidian file to read from.
     * @param {Property} property - The property definition to retrieve the value for.
     * @returns {*} The value of the property, or `null` if the file has no cache or frontmatter.
     *
     * @example
     * const status = getPropertyValue(file, customJS.FileMetadata.properties.status);
     * // → "in_progress"
     */
    getPropertyValue(file, property) {
        const fileCache = app.metadataCache.getFileCache(file);
        if (!fileCache || !fileCache.frontmatter) {
            return null;
        }
        return fileCache.frontmatter[property.name];
    }

    /**
     * Sets a single frontmatter property on a file.
     *
     * @param {TFile} file - The Obsidian file to modify.
     * @param {PropertyValuePair} value - The property name/value pair to write.
     *
     * @example
     * setPropertyValue(file, new PropertyValuePair({ name: "status", value: "done" }));
     */
    async setPropertyValue(file, value) {
        await app.fileManager.processFrontMatter(file, (fm) => {
            fm[value.property.name] = value.value;
        });
    }

    /**
     * Sets multiple frontmatter properties on a file in a single write operation.
     *
     * @param {TFile} file - The Obsidian file to modify.
     * @param {PropertyValuePair[]} values - An array of property name/value pairs to write.
     *
     * @example
     * setPropertyValues(file, [
     *     new PropertyValuePair({ name: "status",   value: "in_progress" }),
     *     new PropertyValuePair({ name: "due_date", value: "2026-03-06"  }),
     *     new PropertyValuePair({ name: "priority", value: "high"        }),
     * ]);
     */
    async setPropertyValues(file, values) {
        await app.fileManager.processFrontMatter(file, (fm) => {
            for (const value of values) {
                fm[value.property.name] = value.value;
            }
        });
    }

    
    //-- LINK UTILS
    getFileFromPath(relativePath) {
        return app.vault.getFileByPath(relativePath);
    }

    async getLinkedFile(linkText, sourceFile) {
        const strippedLinkText = this.stripLinkDecoration(linkText)
        return await app.metadataCache.getFirstLinkpathDest(strippedLinkText, sourceFile.path);
    }

    stripLinkDecoration(linkText) {
        return linkText.replace(/^\[\[|\]\]$/g, "");
    }


    //-- TIME UTILS

    /**
     * Formats a date as a YYYY-MM-DD string.
     * @param {Date} date - The date to format.
     * @returns {string} The formatted date string.
     */
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    /**
     * Returns today's date as a YYYY-MM-DD string.
     * @returns {string} Today's date string.
     */
    getToday() {
        return this.formatDate(new Date());
    }

    /**
     * Returns the creation date of a file as a YYYY-MM-DD string.
     * @param {TFile} file - The file to get the creation date from.
     * @returns {string} The file's creation date string.
     */
    getFileCreationDate(file) {
        return this.formatDate(new Date(file.stat.ctime));
    }
}
