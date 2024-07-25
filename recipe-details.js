$(document).ready(function() {
    function getRecipeIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    function fetchRecipeDetails(recipeId) {
        // Initialize DynamoDB document client
        const docClient = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: 'Recipe', // Your DynamoDB table name
            Key: {
                Id: recipeId
            }
        };

        docClient.get(params, function(err, data) {
            if (err) {
                console.error('Error fetching recipe details:', err);
                alert('Error fetching recipe details. Please try again.');
            } else {
                displayRecipeDetails(data.Item);
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
