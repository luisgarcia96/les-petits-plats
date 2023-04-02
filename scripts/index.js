import { getRecipes } from '../controller/search.js';

import { generateRecipeTemplate } from '../templates/recipeCard.js';
import { generateTagTemplate } from '../templates/tag.js';
import { isTagAlreadySelected } from './utils/isTagAlreadySelected.js';

// DOM Elements
const buttons = document.querySelectorAll('.button');
const recipesSection = document.querySelector('.recipes');
const tagsSection = document.querySelector('.selected-tags');
const items = document.querySelectorAll('.item');

//Search parameters
let search = '';
let tags = [];

//Add all recipes
const recipes = getRecipes(search, tags);
recipes.forEach(recipe => {
    const recipeCard = generateRecipeTemplate(recipe);
    recipesSection.insertAdjacentHTML('beforeend', recipeCard);
})

// Add listeners to the buttons
buttons.forEach((btn) => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        const inputBar = this.children[1];
        inputBar.addEventListener('click', (event) => {
            event.stopPropagation();
        })
        inputBar.focus();
    })
});

//Add items listeners to generate tags
items.forEach(item => {
    item.addEventListener('click', function() {
        const tag = generateTag(this);
        const closeIcon = tag.querySelector('.icon-container');
        
        closeIcon.addEventListener('click', function() {
            removeTag(tag)
        })

        if (!isTagAlreadySelected(tag)) {
            tagsSection.appendChild(tag);
        }
    })
})

//Helper functions
function stringToHTML(str) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html');
	return doc.body.firstChild;
};

function generateTag(item) {
    const tag = stringToHTML(generateTagTemplate(item));
    return tag;
};

function removeTag(elem) {
    elem.parentNode.removeChild(elem);
}