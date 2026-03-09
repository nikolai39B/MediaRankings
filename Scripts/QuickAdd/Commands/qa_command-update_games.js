module.exports = async (params) => {
    // Destructure the parameters
    const { app, quickAddApi, variables } = params;

    console.log("update_games begin");

    // Update the file properties
    await customJS.GameProcessing.processTopGames();
    await customJS.GameProcessing.processTopGamesYear("2019");
    await customJS.GameProcessing.processTopGamesYear("2020");
    await customJS.GameProcessing.processTopGamesYear("2021");
    await customJS.GameProcessing.processTopGamesYear("2022");
    await customJS.GameProcessing.processTopGamesYear("2023");
    await customJS.GameProcessing.processTopGamesYear("2024");
    await customJS.GameProcessing.processTopGamesYear("2025");
    await customJS.GameProcessing.processTopGamesYear("2026");

    console.log("update_games complete");
};
