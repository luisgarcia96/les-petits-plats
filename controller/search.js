import recipes from '../data/recipes.js'

const matchingRecipes = [];
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
 

    //Search by appliance tag


    //Search by utensil tag

    return matchingRecipes;
}
