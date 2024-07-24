$(document).ready(function() {
    $('#submitRecipeForm').submit(function(event) {
        event.preventDefault();

        const title = $('#title').val();
        const ingredients = $('#ingredients').val();
        const instructions = $('#instructions').val();
        const imageFile = $('#image')[0].files[0];

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = function() {
            const imageData = reader.result.split(',')[1]; // Remove the base64 prefix

            const recipe = {
                title,
                ingredients,
                instructions,
                image: imageData
            };

            $.ajax({
                url: 'https://your-api-gateway-endpoint/submit-recipe',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(recipe),
                success: function(response) {
                    alert('Recipe submitted successfully!');
                    updateRecipesPage();
                    updateIndexPage();
                },
                error: function(error) {
                    console.error('Error submitting recipe:', error);
                    alert('Error submitting recipe. Please try again.');
                }
            });
        };
    });
});

function updateRecipesPage() {
    $.ajax({
        url: 'https://your-api-gateway-endpoint/get-recipes',
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
        url: 'https://your-api-gateway-endpoint/get-recipes',
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
