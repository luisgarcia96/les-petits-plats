/**
 * Generates a tag template
 * @param {*} item 
 * @returns The tag in the form of a String
 */
export function generateTagTemplate(item) {
    const isIngredient = item.classList.contains('item-ingredient');
    const isAppliance = item.classList.contains('item-appliance');
    const isUtensile = item.classList.contains('item-utensile');

    const tagIdentifier = isIngredient ? 'ingredient' : (isAppliance ? 'appliance' : (isUtensile ? 'utensile' : null));

    const tagTemplate = `                
        <div class="tag ${tagIdentifier}-tag">
            <p class="tag-text">${item.innerText}</p>
            <div class="icon-container">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
    `;

    return tagTemplate;
};