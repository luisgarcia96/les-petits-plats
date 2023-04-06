/**
 * Get the ingredients, appliances and utensils that corresponds to 
 * the research and populates the tags' buttons
 * 
 * @param {Array} matchedRecipes Recipes array
 */
export function generateFilters( matchedRecipes ) {

    //Get the ingredients for matched recipes
    function getAllIngredients() {
        const allIngredients = [];
        matchedRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                allIngredients.push(ingredient.ingredient)
            })
        })
        return [...new Set(allIngredients)];
    }
    
    //Get the appliances for matched recipes
    function getAllAppliances() {
        const allAppliances = [];
        matchedRecipes.forEach(recipe => {
          allAppliances.push(recipe.appliance)  
        })
        return [...new Set(allAppliances)];
    }
    
    //Get the utensiles for matched recipes
    function getAllUtensiles() {
        const allUtensiles = [];
        matchedRecipes.forEach(recipe => {
          allUtensiles.push(...recipe.ustensils); 
        })
        return [...new Set(allUtensiles)];
    }
    
    //DOM elements
    const ingredientsListContainer = document.querySelector('.ingredients-list-container').children[0];
    const appliancesListContainer = document.querySelector('.appliances-list-container').children[0];
    const utensilesListContainer = document.querySelector('.utensiles-list-container').children[0];
    
    //Populate ingredients
    const ingredients = getAllIngredients();
    ingredients.forEach(ingredient => {
        const newItem = document.createElement('li');
        newItem.classList.add('item', 'item-ingredient');
        newItem.innerText = ingredient;
    
        ingredientsListContainer.insertAdjacentElement('beforeend', newItem);
    })
    
    //Populate appliances
    const appliances = getAllAppliances();
    appliances.forEach(appliance => {
        const newItem = document.createElement('li');
        newItem.classList.add('item', 'item-appliance');
        newItem.innerText = appliance;
    
        appliancesListContainer.insertAdjacentElement('beforeend', newItem);
    });
    
    //Populate Utensiles
    const utensiles = getAllUtensiles();
    utensiles.forEach(utensile => {
        const newItem = document.createElement('li');
        newItem.classList.add('item', 'item-utensile');
        newItem.innerText = utensile;
    
        utensilesListContainer.insertAdjacentElement('beforeend', newItem);
    })
}