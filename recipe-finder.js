// Selecting elements from the DOM
const recipeContainer = document.getElementById('recipe-container'); // Correct ID for recipe container
const searchBtn = document.getElementById('search-button'); // Correct ID for search button

// Function to fetch recipes from the API
async function fetchRecipes(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`); // API URL correction with proper syntax
        const data = await response.json();
        displayRecipes(data.meals); // Call the display function with the data
    } catch (error) {
        console.error('Error fetching recipes:', error); // Error handling for network/API issues
    }
}

// Function to display the fetched recipes
function displayRecipes(recipes) {
    recipeContainer.innerHTML = ''; // Clear previous results

    if (recipes) {
        // Loop through each recipe and create a card
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe-card'); // Adding a class for better styling

            // Get the ingredients list
            const ingredientsList = getIngredientsList(recipe);

            // Populate the recipe card with HTML content
            recipeDiv.innerHTML = `
                <h3>${recipe.strMeal}</h3>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p><strong>Recipe ID:</strong> ${recipe.idMeal}</p>
                <p><strong>Ingredients:</strong> ${ingredientsList}</p>
                <a href="${recipe.strSource}" target="_blank" class="view-recipe-btn">View Recipe</a>
            `;

            // Append the card to the recipe container
            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        // If no recipes are found, display a message
        recipeContainer.innerHTML = '<p>No recipes found. Please try another search.</p>';
    }
}

// Helper function to extract and format the ingredients list from the recipe object
function getIngredientsList(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`]; // Use dynamic property access
        const measure = recipe[`strMeasure${i}`];

        // Only add non-empty ingredients and measures
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
        }
    }
    return ingredients.join(', '); // Return a comma-separated list of ingredients
}

// Add an event listener to the search button for searching recipes
searchBtn.addEventListener('click', () => {
    const query = document.getElementById('search-input').value; // Correct ID for search input field
    if (query) {
        fetchRecipes(query); // Fetch recipes based on the query
    }
});
