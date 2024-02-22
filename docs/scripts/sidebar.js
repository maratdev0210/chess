// Modify the state of the sidebar navigations
const components = document.querySelector('.components');
const majorComponents = document.querySelector('.major-component');

function toggleAttribute(attributeName, element) {
    if (element.getAttribute(attributeName) !== null) {
        element.removeAttribute(attributeName);
        return;
    }
    element.setAttribute(attributeName, '');
}

majorComponents.addEventListener('click', () => {
    toggleAttribute('hidden', components);
});
