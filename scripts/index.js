import recipes from '../data/recipes.js'
import { generateRecipeTemplate } from '../templates/recipeCard.js';

// DOM Elements
const buttons = document.querySelectorAll('.button');
const recipesSection = document.querySelector('.recipes');
console.log(recipes);

// Add listeners to the buttons
buttons.forEach((btn) => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        this.children[1].focus();
    })
});