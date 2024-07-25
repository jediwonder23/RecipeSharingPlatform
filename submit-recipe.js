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
            Id: Date.now().toString(), // Use timestamp as a unique ID
            title,
            ingredients,
            instructions
        };

        // Initialize DynamoDB document client
        const docClient = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: 'Recipe', // Your DynamoDB table name
            Item: recipe
        };

        docClient.put(params, function(err, data) {
            if (err) {
                console.error('Error submitting recipe:', err);
                alert('Error submitting recipe. Please try again.');
            } else {
                alert('Recipe submitted successfully!');
                window.location.href = 'recipes.html'; // Redirect to recipes page after successful submission
            }
        });
    });
});
