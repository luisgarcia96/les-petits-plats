import { getRecipes } from '../controller/search.js';
import { generateRecipeTemplate } from '../templates/recipeCard.js';
import { generateTagTemplate } from '../templates/tag.js';
import { generateFilters } from './utils/generateFilters.js';
import { isTagAlreadySelected } from './utils/isTagAlreadySelected.js';

//Search parameters
let search = '';
let tags = [];

// DOM general common elements
const tagsSection = document.querySelector('.selected-tags');
const recipesSection = document.querySelector('.recipes');
const noRecipesMessage = document.querySelector('.no-recipes-message');


//Add listeners
function addSearchlisteners() {

    //Handle search bar input
    const searchBar = document.getElementById('search-input');
    searchBar.addEventListener('input', (e) => {
        search = e.target.value;
    
        //Launch search only when user has typed at least 3 characters
        if (search.length >= 3 ) {
            generateRecipeCards();
        }
    })
    
    // Add listeners to the buttons
    const buttons = document.querySelectorAll('.button');
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
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const tag = generateTag(this);
            const closeIcon = tag.querySelector('.icon-container');
            
            closeIcon.addEventListener('click', function() {
                tags.splice(tags.indexOf(tag), 1);
                removeTag(tag);
                generateRecipeCards();
            })
    
            if (!isTagAlreadySelected(tag)) {
                tags.push(tag);
                tagsSection.appendChild(tag);
                generateRecipeCards();
            }
        })
    })
}


//Helper functions
function generateRecipeCards() {
    //Get all the recipes
    const recipes = getRecipes(search, tags);
    if (recipes.length === 0) {
        noRecipesMessage.classList.add('active');
    } else {
        noRecipesMessage.classList.remove('active');
    }

    //Display the filters
    generateFilters(recipes);

    //Display the cards
    recipesSection.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = generateRecipeTemplate(recipe);
        recipesSection.insertAdjacentHTML('beforeend', recipeCard);
    });
}

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


//Main function
function init() {
    generateRecipeCards();

    addSearchlisteners();
}

init();