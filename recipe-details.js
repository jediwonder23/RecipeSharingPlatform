$(document).ready(function() {
    function getRecipeIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    function displayRecipeDetails(recipe) {
        $('#recipe-title').text(recipe.title);

        const ingredientsList = $('#ingredients-list');
        ingredientsList.empty();
        recipe.ingredients.forEach(ingredient => {
            ingredientsList.append(`<li>${ingredient}</li>`);
        });

        const instructionsList = $('#instructions-list');
        instructionsList.empty();
        recipe.instructions.forEach(instruction => {
            instructionsList.append(`<li>${instruction}</li>`);
        });
    }

    const recipeId = getRecipeIdFromUrl();
    if (recipeId) {
        let recipe;
        switch (recipeId) {
            case '1':
                recipe = {
                    title: 'Chocolate Chip Cookies',
                    ingredients: ['1 cup of flour', '1/2 cup of sugar', '1 cup of chocolate chips'],
                    instructions: ['Mix all ingredients together', 'Bake at 350 degrees for 12 minutes', 'Let cool and enjoy']
                };
                break;
            case '2':
                recipe = {
                    title: 'Spaghetti Bolognese',
                    ingredients: ['200g of spaghetti', '100g of minced beef', '1 can of tomatoes'],
                    instructions: ['Cook the spaghetti according to the package instructions', 'Brown the minced beef in a pan', 'Add the tomatoes and simmer for 20 minutes', 'Combine the spaghetti and sauce, then serve']
                };
                break;
            // Add more cases for additional recipes
            default:
                alert('Recipe not found!');
                return;
        }
        displayRecipeDetails(recipe);
    } else {
        alert('No recipe ID found in URL.');
    }
});

