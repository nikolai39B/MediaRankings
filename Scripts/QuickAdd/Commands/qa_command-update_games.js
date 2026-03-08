module.exports = async (params) => {
    // Destructure the parameters
    const { app, quickAddApi, variables } = params;

    // Update the file properties
    customJS.GameProcessing.processTopGames();
    customJS.GameProcessing.processTopGamesYear("2026");
};
