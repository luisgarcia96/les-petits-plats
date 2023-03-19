import recipes from '../data/recipes.js'
import { generateRecipeTemplate } from '../templates/recipeCard.js';

// DOM Elements
const buttons = document.querySelectorAll('.button');
const recipesSection = document.querySelector('.recipes');

//Add all recipes
recipes.forEach(recipe => {
    const recipeCard = generateRecipeTemplate(recipe);
    recipesSection.insertAdjacentHTML('beforeend', recipeCard);
})

// Add listeners to the buttons
buttons.forEach((btn) => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        this.children[1].focus();
    })
});