/**
 * Generates a Recipe card template
 * @param {*} recipe 
 * @returns The recipe template in the form of a String
 */
export function generateRecipeTemplate(recipe) {
    
    const {id, name, servings, ingredients, time, description, appliance, utensils} = recipe

    const recipeTemplate = `
        <article class="recipe-card">
            <div class="card-top">
            </div>
            <div class="card-bottom">
                <div class="card-bottom-first">
                    <h3 class="recipe-card-title">${name}</h3>
                    <div class="recipe-card-time">
                        <i class="fa-regular fa-clock"></i>
                        <h3>${time} min</h3>
                    </div>
                </div>
                <div class="card-bottom-second">
                    <div class="recipe-card-ingredients">
                        ${generateList(ingredients)}
                    </div>
                    <div class="recipe-card-instructions">
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        </article>
    `;

    function generateList(ingredientsArray) {

        const list = document.createElement('ul');
        list.classList.add('card-list');

        for (const individualIngredient of ingredientsArray) {
            const {ingredient, quantity, unit} = individualIngredient;

            const ingredientsListItem = `
                <li class="card-list-item">
                    <span class="card-list-item-title">
                        ${ingredient}
                    </span>&nbsp;:&nbsp;
                    <p class="card-list-item-quantity">
                        ${quantity ? quantity : ''}&nbsp;${unit ? unit : ''}
                    </p>
                </li>
            `;

            list.insertAdjacentHTML('beforeend', ingredientsListItem);
        }
        
        return list.outerHTML;
    }

    return recipeTemplate;
}