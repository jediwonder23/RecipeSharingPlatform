$(document).ready(function() {
    function getRecipeIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('Id');
    }

    function fetchRecipeDetails(recipeId) {
        const apiUrl = `https://gmbe2anqbl.execute-api.us-east-1.amazonaws.com/dev/submit-recipe/{id}/${recipeId}`;

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function(response) {
                const recipe = JSON.parse(response);
                displayRecipeDetails(recipe);
            },
            error: function(error) {
                console.error('Error fetching recipe details:', error);
                alert('Error fetching recipe details. Please try again.');
            }
        });
    }

    function displayRecipeDetails(recipe) {
        $('#recipe-title').text(recipe.title);

        const ingredientsList = $('#ingredients-list');
        ingredientsList.empty();
        recipe.ingredients.split('\n').forEach(ingredient => {
            ingredientsList.append(`<li>${ingredient}</li>`);
        });

        const instructionsList = $('#instructions-list');
        instructionsList.empty();
        recipe.instructions.split('\n').forEach(instruction => {
            instructionsList.append(`<li>${instruction}</li>`);
        });
    }

    const recipeId = getRecipeIdFromUrl();
    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        alert('No recipe ID found in URL.');
    }
});
