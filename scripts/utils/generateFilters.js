/**
 * Get the ingredients, appliances and utensils that corresponds to 
 * the research and populates the tags' buttons
 * 
 * @param {Array} matchedRecipes Recipes array
 */
export function generateFilters( matchedRecipes, ingredientsSearch, appliancesSearch, utensilesSearch ) {
    
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

    //Get filtered ingredients
    function getFilteredIngredients(allIngredientsArray, ingredientsSearch){
        const copyOfAllIngredients = [...allIngredientsArray];
        const filteredIngredients = copyOfAllIngredients.filter(ingredient => {
            return ingredient.toLowerCase().includes(ingredientsSearch.toLowerCase());
        })
        return filteredIngredients;
    };
    //Get filtered appliances
    function getFilteredAppliances(allAppliancesArray, appliancesSearch){
        const copyOfAllAppliances = [...allAppliancesArray];
        const filteredAppliances = copyOfAllAppliances.filter(appliance => {
            return appliance.toLowerCase().includes(appliancesSearch.toLowerCase());
        })
        return filteredAppliances;
    };
    //Get filtered utensiles
    function getFilteredUtensiles(allUtensilesArray, utensilesSearch){
        const copyOfAllUtensiles = [...allUtensilesArray];
        const filteredUtensiles = copyOfAllUtensiles.filter(utensile => {
            return utensile.toLowerCase().includes(utensilesSearch.toLowerCase());
        })
        return filteredUtensiles;
    };
    
    let allIngredients = getAllIngredients();
    let allAppliances = getAllAppliances();
    let allUtensiles = getAllUtensiles();
    
    //DOM elements
    const ingredientsListContainer = document.querySelector('.ingredients-list-container').children[0];
    const appliancesListContainer = document.querySelector('.appliances-list-container').children[0];
    const utensilesListContainer = document.querySelector('.utensiles-list-container').children[0];
    
    //Populate ingredients
    const ingredients = ingredientsSearch ? getFilteredIngredients(allIngredients, ingredientsSearch) : allIngredients;
    ingredientsListContainer.innerHTML='';

    ingredients.forEach(ingredient => {
        const newItem = document.createElement('li');
        newItem.classList.add('item', 'item-ingredient');
        newItem.innerText = ingredient;
    
        ingredientsListContainer.insertAdjacentElement('beforeend', newItem);
    })
    
    //Populate appliances
    const appliances = appliancesSearch ? getFilteredAppliances(allAppliances, appliancesSearch) : allAppliances;
    appliancesListContainer.innerHTML='';

    appliances.forEach(appliance => {
        const newItem = document.createElement('li');
        newItem.classList.add('item', 'item-appliance');
        newItem.innerText = appliance;
    
        appliancesListContainer.insertAdjacentElement('beforeend', newItem);
    });
    
    //Populate Utensiles
    const utensiles = utensilesSearch ? getFilteredUtensiles(allUtensiles, utensilesSearch) : allUtensiles;
    utensilesListContainer.innerHTML='';

    utensiles.forEach(utensile => {
        const newItem = document.createElement('li');
        newItem.classList.add('item', 'item-utensile');
        newItem.innerText = utensile;
    
        utensilesListContainer.insertAdjacentElement('beforeend', newItem);
    })
}