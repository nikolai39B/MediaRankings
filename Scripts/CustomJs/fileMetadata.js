class FileMetadata {
    // Property
    Property = class {
        constructor({ name, display }) {
            this.name = name;
            this.display = display;
        }
    }

    // Property value pair
    PropertyValuePair = class {
        constructor({ property, value }) {
            this.property = property;
            this.value = value;
        }
    }

    // Methods
    getPropertyByName(name, properties) {
        return Object.values(properties).find(property => property.name === name) ?? null;
    }
}
