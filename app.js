// Grabs the grid container from the page 
const grid = document.getElementById('card-grid');
grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8';


// Renders all property cards into the grid 
function renderCards(propertyList) {
    grid.innerHTML = propertyList
        .map(property => createPropertyCard(property))
        .join('');
}


// Start: render everything on page load
renderCards(properties);

