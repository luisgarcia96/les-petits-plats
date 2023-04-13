import recipes from '../data/recipes.js'

let matchingRecipes = [];
const allRecipes = recipes; //Get all recipes

export function getRecipes(search, tags) {

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
    const filteredRecipesByIngredient = [];
    const filteredRecipesByAppliance = [];
    const filteredRecipesByUtensile = [];
    const filteredRecipesBySearch = [];

    for (let i = 0; i < allRecipes.length; i++) {
        const currentRecipe = allRecipes[i]
        
        //Search by ingredient tag
        if (ingredients.length > 0) {

            for (let j = 0; j < ingredients.length; j++) {
                const currentTagIngredient = ingredients[j].toLowerCase();

                for (let k = 0; k < currentRecipe.ingredients.length; k++) {
                    const currentRecipeIngredient = currentRecipe.ingredients[k].ingredient.toLowerCase();

                    if (currentRecipeIngredient === currentTagIngredient) {
                        filteredRecipesByIngredient.push(currentRecipe);
                    }
                }  
            }
        }

        //Search by appliance tag
        if (appliances.length > 0) {
            for (let j = 0; j < appliances.length; j++) {
                const currentTagAppliance = appliances[j].toLocaleLowerCase();
                const recipeAppliance = currentRecipe.appliance.toLocaleLowerCase();

                if (recipeAppliance === currentTagAppliance) {
                    filteredRecipesByAppliance.push(currentRecipe);
                }
                
            }
        }

        //Search by utensil tag
        if (utensiles.length > 0) {
            for (let j = 0; j < utensiles.length; j++) {
                const currentTagUtensile = utensiles[j].toLowerCase();

                for (let k = 0; k < currentRecipe.ustensils.length; k++) {
                    const currentRecipeUtensile = currentRecipe.ustensils[k].toLocaleLowerCase();

                    if (currentRecipeUtensile === currentTagUtensile) {
                        filteredRecipesByUtensile.push(currentRecipe);
                    }
                    
                }
                
            }
        }

        //Search by recipe name, description or ingredient name
        if (search.length > 0) {
            const searchWords = search.toLowerCase().split(' ');
    
            const currentRecipeName = currentRecipe.name.toLowerCase();
            const currentRecipeDescription = currentRecipe.description.toLowerCase();

            const currentRecipeIngredients = []; //TODO Maybe this is optional
            for (let j = 0; j < currentRecipe.ingredients.length; j++) {
                currentRecipeIngredients.push(currentRecipe.ingredients[j].ingredient.toLowerCase());
            }

            let found = true;

            for (let j = 0; j < searchWords.length; j++) {
                if (currentRecipeName.indexOf(searchWords[j]) === -1 && 
                    currentRecipeDescription.indexOf(searchWords[j]) === -1 && 
                    currentRecipeIngredients.indexOf(searchWords[j]) === -1) {

                    found = false;
                    break;
                }
            }

            if (found) {
                filteredRecipesBySearch.push(currentRecipe);
            }
        }
    }
    matchingRecipes = getCommonObjects(filteredRecipesByIngredient, filteredRecipesByAppliance, filteredRecipesByUtensile, filteredRecipesBySearch, 'id');

    return matchingRecipes;
}



//Helper function for search
function getCommonObjects(array1, array2, array3, array4, propertyName) {
    const commonObjects = [];
  
    if (array1.length === 0 && array2.length === 0 && array3.length === 0 && array4.length === 0) {
        // If all arrays are empty, return an empty array
        return commonObjects;
    } else if (array1.length === 0) {
        // If array1 is empty, return the first non-empty array
        return array2.length > 0 ? array2 : array3.length > 0 ? array3 : array4;
    }
  
    // Use array1 as the base array to compare against
    for (let i = 0; i < array1.length; i++) {
        const currentObject = array1[i];
        let isCommon = true;
  
        if (array2.length > 0) {
            // Check if currentObject[propertyName] exists in array2
            let found = false;
            for (let j = 0; j < array2.length; j++) {
                if (array2[j][propertyName] === currentObject[propertyName]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                isCommon = false;
            }
        }
  
        if (isCommon && array3.length > 0) {
            // Check if currentObject[propertyName] exists in array3
            let found = false;
            for (let j = 0; j < array3.length; j++) {
                if (array3[j][propertyName] === currentObject[propertyName]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                isCommon = false;
            }
        }
  
        if (isCommon && array4.length > 0) {
            // Check if currentObject[propertyName] exists in array4
            let found = false;
            for (let j = 0; j < array4.length; j++) {
                if (array4[j][propertyName] === currentObject[propertyName]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                isCommon = false;
            }
        }
  
        if (isCommon) {
            commonObjects.push(currentObject);
        }
    }
  
    return commonObjects;
}
