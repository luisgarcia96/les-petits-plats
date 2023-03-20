import recipes from "../data/recipes.js"

//Get all the ingredients
function getAllIngredients() {
    const allIngredients = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient)
        })
    })
    return [...new Set(allIngredients)];
}

//Get all the appliances
function getAllAppliances() {
    const allAppliances = [];
    recipes.forEach(recipe => {
      allAppliances.push(recipe.appliance)  
    })
    return [...new Set(allAppliances)];
}

//Get all the utensiles
function getAllUtensiles() {
    const allUtensiles = [];
    recipes.forEach(recipe => {
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