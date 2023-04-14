import recipes from '../data/recipes.js'

let matchingRecipes = [];
const allRecipes = recipes; //Get all recipes

export function getRecipes(search, tags) {
    let start = performance.now();

    matchingRecipes = allRecipes;

    //Organize tags
    const ingredients = [];
    const appliances = [];
    const utensiles = [];

    if (tags.length > 0) {
        tags.forEach(tag => {
            const tagText = tag.children[0].innerText;
            
            if (tag.classList.contains('ingredient-tag')) {
                ingredients.push(tagText);
            } else if (tag.classList.contains('appliance-tag')) {
                appliances.push(tagText);
            } else if (tag.classList.contains('utensile-tag')) {
                utensiles.push(tagText);
            }
        }) 
    }

    //Launch search only when user has typed at least 3 characters
    if (search.length <= 3 && tags.length === 0) {
        return allRecipes
    }
    
    //Data processing (Algorithm 2)

    //Search by ingredient tag
    if (ingredients.length > 0) {
        matchingRecipes = matchingRecipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient);
            return ingredients.every(ingredient => recipeIngredients.includes(ingredient));
        });
    }

    //Search by appliance tag
    if (appliances.length > 0) {
        matchingRecipes = matchingRecipes.filter(recipe => appliances.includes(recipe.appliance));
    }

    //Search by utensil tag
    if (utensiles.length > 0) {
        matchingRecipes = matchingRecipes.filter(recipe => {
            const recipeUtensils = recipe.ustensils;
            return utensiles.every(utensil => recipeUtensils.includes(utensil));
        });
    }

    //Search by recipe name, description or ingredient name
    if (search.length > 0) {
        const searchWords = search.toLowerCase().split(' ');
        matchingRecipes = matchingRecipes.filter(recipe => {
            const recipeName = recipe.name.toLowerCase();
            const recipeDescription = recipe.description.toLowerCase();
            const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            return searchWords.every(word => recipeName.includes(word) || recipeDescription.includes(word) || recipeIngredients.includes(word));
        });
    }

    let timeTaken = performance.now() - start;
    console.log("Total time taken : " + timeTaken + " milliseconds");

    return matchingRecipes;
}
