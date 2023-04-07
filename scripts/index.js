import { getRecipes } from '../controller/search.js';
import { generateRecipeTemplate } from '../templates/recipeCard.js';
import { generateTagTemplate } from '../templates/tag.js';
import { generateFilters } from './utils/generateFilters.js';
import { isTagAlreadySelected } from './utils/isTagAlreadySelected.js';

// DOM general common elements
const ingredientsInput = document.getElementById('ingredients-input');
const appliancesInput = document.getElementById('appliances-input');
const utensilesInput = document.getElementById('utensiles-input');
const tagsSection = document.querySelector('.selected-tags');
const recipesSection = document.querySelector('.recipes');
const noRecipesMessage = document.querySelector('.no-recipes-message');

//Search parameters
let search = '';
let tags = [];

let ingredientsSearch = '';
let appliancesSearch = '';
let utensilesSearch = '';

//First load
const allRecipes = getRecipes(search, tags); 
let matchedRecipes = allRecipes; 
generateRecipeCards();

//Add buttons' listeners
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

//Add search bar listener
const searchBar = document.getElementById('search-input');
searchBar.addEventListener('input', (e) => {
    search = e.target.value;

    //Launch search only when user has typed at least 3 characters
    if (search.length >= 3 ) {
        generateRecipeCards();
    }
})

//Add tags' inputs listeners
ingredientsInput.addEventListener('input', (e) => { //Ingredients input
    ingredientsSearch = e.target.value;
    createFilters();
})
appliancesInput.addEventListener('input', (e) => { //Appliances input
    appliancesSearch = e.target.value;
    createFilters();
})
utensilesInput.addEventListener('input', (e) => { //Utensiles input
    utensilesSearch = e.target.value;
    createFilters();
})


//Helper functions
function generateRecipeCards() {

    //Get the recipes
    if (search || tags.length > 0) {
        matchedRecipes = getRecipes(search, tags);
    } else {
        matchedRecipes = allRecipes;
    }

    //Show message if there are not recipes
    if (matchedRecipes.length === 0) {
        noRecipesMessage.classList.add('active');
    } else {
        noRecipesMessage.classList.remove('active');
    }

    //Display filters corresponding to search
    createFilters();

    //Display the cards
    recipesSection.innerHTML = '';
    matchedRecipes.forEach(recipe => {
        const recipeCard = generateRecipeTemplate(recipe);
        recipesSection.insertAdjacentHTML('beforeend', recipeCard);
    });
}

function createFilters() {

    generateFilters(matchedRecipes, ingredientsSearch, appliancesSearch, utensilesSearch);

    //Add items' listeners 
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const tag = createTag(this);
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

function stringToHTML(str) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html');
	return doc.body.firstChild;
};

function createTag(item) {
    const tag = stringToHTML(generateTagTemplate(item));
    return tag;
};

function removeTag(elem) {
    elem.parentNode.removeChild(elem);
}