module.exports = async (params) => {
    // Destructure the parameters
    const { app, quickAddApi, variables } = params;

    // Update the file properties
    customJS.GameProcessing.processTopGames();
    customJS.GameProcessing.processTopGamesYear("2023");
    customJS.GameProcessing.processTopGamesYear("2024");
    customJS.GameProcessing.processTopGamesYear("2025");
    customJS.GameProcessing.processTopGamesYear("2026");

    console.log("update_games complete")
};
