$(document).ready(function() {
    function updateRecipesPage() {
        // Initialize DynamoDB document client
        const docClient = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: 'Recipe', // Your DynamoDB table name
        };

        docClient.scan(params, function(err, data) {
            if (err) {
                console.error('Error fetching recipes:', err);
            } else {
                const recipes = data.Items;
                const recipesContainer = $('.recipes-container');
                recipesContainer.empty();
                recipes.forEach(recipe => {
                    const recipeCard = `
                        <article class="recipe-card">
                            <h3>${recipe.title}</h3>
                            <p>${recipe.ingredients.split('\n').join('<br>')}</p>
                            <a href="recipe-details.html?id=${recipe.Id}">View Recipe</a>
                        </article>
                    `;
                    recipesContainer.append(recipeCard);
                });
            }
        });
    }

    updateRecipesPage();
});
