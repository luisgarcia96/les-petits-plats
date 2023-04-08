import recipes from '../data/recipes.js'

export function getRecipes(search, tags) {

    let recipesArray = recipes; //Get all recipes

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
    
    //Data processing (Algorithm 1)



    return recipesArray;
}
