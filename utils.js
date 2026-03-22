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


function filterProperties(propertyList, filters) {
  return propertyList.filter(function(property) {

    // Check type — skip if filter is 'all'
    if (filters.type !== 'all' && property.type !== filters.type) {
      return false;
    }

    // Check city — skip if filter is 'all'
    if (filters.city !== 'all' && property.city !== filters.city) {
      return false;
    }

    // Check beds — property must have at least the minimum
    if (property.beds < filters.beds) {
      return false;
    }

    // Check max price — only apply if user entered a value
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // If it passed all checks, include it
    return true;
  });
}