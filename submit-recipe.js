$(document).ready(function() {
    $('#submitRecipeForm').submit(function(event) {
        event.preventDefault();

        const title = $('#title').val();
        const ingredients = $('#ingredients').val();
        const instructions = $('#instructions').val();

        if (!title || !ingredients || !instructions) {
            alert("All fields are required.");
            return;
        }

        const recipe = {
            title,
            ingredients,
            instructions
        };

        const apiUrl = 'https://aptzd1pmx9.execute-api.us-east-1.amazonaws.com/Dev/submit-recipe';

        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(recipe),
            success: function(response) {
                alert('Recipe submitted successfully!');
                window.location.href = 'recipes.html'; // Redirect to recipes page after successful submission
            },
            error: function(error) {
                console.error('Error submitting recipe:', error);
                alert('Error submitting recipe. Please try again.');
            }
        });
    });
});

function updateRecipesPage() {
    $.ajax({
        url: 'https://aptzd1pmx9.execute-api.us-east-1.amazonaws.com/Dev/submit-recipe',
        type: 'GET',
        success: function(recipes) {
            const recipesContainer = $('.recipes-container');
            recipesContainer.empty();
            recipes.forEach(recipe => {
                const recipeCard = `
                    <article class="recipe-card">
                        <h3>${recipe.title}</h3>
                        <img src="${recipe.image}" alt="${recipe.title}">
                        <p>${recipe.ingredients.split('\n').join('<br>')}</p>
                        <a href="recipe-details.html?id=${recipe.id}">View Recipe</a>
                    </article>
                `;
                recipesContainer.append(recipeCard);
            });
        },
        error: function(error) {
            console.error('Error fetching recipes:', error);
        }
    });
}

function updateIndexPage() {
    $.ajax({
        url: 'https://aptzd1pmx9.execute-api.us-east-1.amazonaws.com/Dev/submit-recipe',
        type: 'GET',
        success: function(recipes) {
            const featuredRecipesContainer = $('.featured-recipes .recipes-container');
            featuredRecipesContainer.empty();
            recipes.slice(0, 2).forEach(recipe => {
                const recipeCard = `
                    <article class="recipe-card">
                        <h3>${recipe.title}</h3>
                        <img src="${recipe.image}" alt="${recipe.title}">
                        <p>${recipe.ingredients.split('\n').join('<br>')}</p>
                        <a href="recipe-details.html?id=${recipe.id}">View Recipe</a>
                    </article>
                `;
                featuredRecipesContainer.append(recipeCard);
            });
        },
        error: function(error) {
            console.error('Error fetching recipes:', error);
        }
    });
}
