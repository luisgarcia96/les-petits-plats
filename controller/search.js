import recipes from '../data/recipes.js'

let matchingRecipes = [];
const allRecipes = recipes; //Get all recipes

export function getRecipes(search, tags) {

    matchingRecipes.length = 0;

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
    
    //Data processing (Algorithm 1)

    //Search by ingredient tag
    matchingRecipes = [];
    for (let i = 0; i < allRecipes.length; i++) {
    let recipe = allRecipes[i];
    let recipeIngredients = [];
    for (let j = 0; j < recipe.ingredients.length; j++) {
        recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
    }
    let found = true;
    for (let j = 0; j < ingredients.length; j++) {
        if (recipeIngredients.indexOf(ingredients[j].toLowerCase()) === -1) {
        found = false;
        break;
        }
    }
    if (found) {
        matchingRecipes.push(recipe);
    }
    }

    //Search by appliance tag
    if (appliances.length > 0) {
    let filteredRecipes = [];
    for (let i = 0; i < matchingRecipes.length; i++) {
        let recipe = matchingRecipes[i];
        if (appliances.indexOf(recipe.appliance.toLowerCase()) !== -1) {
        filteredRecipes.push(recipe);
        }
    }
    matchingRecipes = filteredRecipes;
    }

    //Search by utensil tag
    if (utensiles.length > 0) {
    let filteredRecipes = [];
    for (let i = 0; i < matchingRecipes.length; i++) {
        let recipe = matchingRecipes[i];
        let recipeUtensils = recipe.ustensils;
        let found = true;
        for (let j = 0; j < utensiles.length; j++) {
        if (recipeUtensils.indexOf(utensiles[j].toLowerCase()) === -1) {
            found = false;
            break;
        }
        }
        if (found) {
        filteredRecipes.push(recipe);
        }
    }
    matchingRecipes = filteredRecipes;
    }

    //Search by recipe name, description or ingredient name
    if (search.length > 0) {
    let searchWords = search.toLowerCase().split(' ');
    let filteredRecipes = [];
    for (let i = 0; i < matchingRecipes.length; i++) {
        let recipe = matchingRecipes[i];
        let recipeName = recipe.name.toLowerCase();
        let recipeDescription = recipe.description.toLowerCase();
        let recipeIngredients = [];
        for (let j = 0; j < recipe.ingredients.length; j++) {
        recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
        }
        let found = true;
        for (let j = 0; j < searchWords.length; j++) {
        if (recipeName.indexOf(searchWords[j]) === -1 &&
            recipeDescription.indexOf(searchWords[j]) === -1 &&
            recipeIngredients.indexOf(searchWords[j]) === -1) {
            found = false;
            break;
        }
        }
        if (found) {
        filteredRecipes.push(recipe);
        }
    }
    matchingRecipes = filteredRecipes;
    }

    return matchingRecipes;
}
