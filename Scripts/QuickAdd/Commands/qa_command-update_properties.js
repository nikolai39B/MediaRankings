module.exports = async (params) => {
    // Destructure the parameters
    const { app, quickAddApi, variables } = params;

    // Update the file properties
    const file = app.workspace.getActiveFile();
    await customJS.FileUtils.updateAutoProperties(file);
};
