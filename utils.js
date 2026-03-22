// FOrmats price differently for rent vs buy listings 
function formatPrice(price, type) {
    if (type === 'rent') {
        return '$' + price.toLocaleString() + '/mo';
    }
    return '$' + (price / 1000).toFixed(0) + 'k';
}


//Converts beds: 0 = 'Studio', anything else = '2 bed'
function formatBeds(beds) {
    return beds === 0 ? 'Studio' : beds + ' bed';
}


//Returns the right badge classes based on listing type
function getBadgeClasses(type) {
    return type === 'rent'
        ? 'bg-teal-100 text-teal-800'
        : 'bg-blue-100 text-blue-800';
}


// Returns the right badge label
function getBadgeLabel(type) {
    return type === 'rent' ? 'For rent' : 'For sale';
}