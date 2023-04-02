import recipes from '../data/recipes.js'
import { generateRecipeTemplate } from '../templates/recipeCard.js';
import { generateTagTemplate } from '../templates/tag.js';
import { isTagAlreadySelected } from './utils/isTagDuplicated.js';

// DOM Elements
const buttons = document.querySelectorAll('.button');
const recipesSection = document.querySelector('.recipes');
const tagsSection = document.querySelector('.selected-tags');
const items = document.querySelectorAll('.item');
let tags = [];

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

//Add items listeners to generate tags
items.forEach(item => {
    item.addEventListener('click', function() {
        const tag = generateTag(this);
        const closeIcon = tag.querySelector('.icon-container');
        
        closeIcon.addEventListener('click', function() {
            removeTag(tag)
        })

        tagsSection.appendChild(tag);
        isTagAlreadySelected();
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