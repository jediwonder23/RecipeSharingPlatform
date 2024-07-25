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

        const apiUrl = 'https://gmbe2anqbl.execute-api.us-east-1.amazonaws.com/dev/submit-recipe';

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

    function updateRecipesPage() {
        $.ajax({
            url: 'https://gmbe2anqbl.execute-api.us-east-1.amazonaws.com/dev/submit-recipe',
            type: 'GET',
            success: function(recipes) {
                const recipesContainer = $('.recipes-container');
                recipesContainer.empty();
                recipes.forEach(recipe => {
                    const recipeCard = `
                        <article class="recipe-card">
                            <h3>${recipe.title}</h3>
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
            url: 'https://gmbe2anqbl.execute-api.us-east-1.amazonaws.com/dev/submit-recipe',
            type: 'GET',
            success: function(recipes) {
                const featuredRecipesContainer = $('.featured-recipes .recipes-container');
                featuredRecipesContainer.empty();
                recipes.slice(0, 2).forEach(recipe => {
                    const recipeCard = `
                        <article class="recipe-card">
                            <h3>${recipe.title}</h3>
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

    // Call update functions if on the appropriate pages
    if (window.location.pathname.endsWith('recipes.html')) {
        updateRecipesPage();
    } else if (window.location.pathname.endsWith('index.html')) {
        updateIndexPage();
    }
});

