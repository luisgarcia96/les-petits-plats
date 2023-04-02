/**
 * Verifies if a tag has been already added to the tag list
 * @param {*} tag 
 * @returns true if the tag was already added, otherwise it returns false
 */
export function isTagAlreadySelected(tag) {
    let isTagAlreadyAdded = false;

    const selectedTagsSection = document.querySelector('.selected-tags');
    const existantTags = selectedTagsSection.querySelectorAll('.tag-text');
    const newTagInnerText = tag.children[0].innerText.toLowerCase();
 
    existantTags.forEach(tag => {
        const existantTagText = tag.innerText.toLowerCase();

        if (newTagInnerText === existantTagText) {
            console.log('Tag already added');
            isTagAlreadyAdded = true;
        }
    })
    return isTagAlreadyAdded;
}