// Grid container
const grid = document.getElementById('card-grid');
grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8';

// Active filters — this object is the single source of truth
// When a filter changes, we update this object and re-render
const activeFilters = {
  type: 'all',
  city: 'all',
  beds: 0,
  maxPrice: null
};

// Populate the city dropdown from your data
// This reads every city in properties.js and adds it as an option
function populateCityFilter() {
  const citySelect = document.getElementById('filter-city');

  // Extract unique cities from the properties array
  const cities = [...new Set(properties.map(p => p.city))];

  cities.forEach(function(city) {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

// Update the results count text above the grid
function updateResultsCount(filtered, total) {
  const counter = document.getElementById('results-count');
  if (filtered === total) {
    counter.textContent = 'Showing all ' + total + ' listings';
  } else {
    counter.textContent = 'Showing ' + filtered + ' of ' + total + ' listings';
  }
}

// Renders cards and updates the count
function renderCards(propertyList) {
  grid.innerHTML = propertyList
    .map(property => createPropertyCard(property))
    .join('');
  updateResultsCount(propertyList.length, properties.length);
}

// Runs every time any filter changes
function applyFilters() {
  const filtered = filterProperties(properties, activeFilters);
  renderCards(filtered);
}

// Listen for changes on each filter input
// When the user picks something, update activeFilters and re-run
document.getElementById('filter-type').addEventListener('change', function(e) {
  activeFilters.type = e.target.value;
  applyFilters();
});

document.getElementById('filter-city').addEventListener('change', function(e) {
  activeFilters.city = e.target.value;
  applyFilters();
});

document.getElementById('filter-beds').addEventListener('change', function(e) {
  activeFilters.beds = parseInt(e.target.value);
  applyFilters();
});

document.getElementById('filter-price').addEventListener('input', function(e) {
  activeFilters.maxPrice = e.target.value ? parseInt(e.target.value) : null;
  applyFilters();
});

// Kick everything off on page load
populateCityFilter();
renderCards(properties);


function runCalculator(price) {

  // Read the three inputs
  const downPayment = parseInt(document.getElementById('calc-down').value);
  const annualRate = parseFloat(document.getElementById('calc-rate').value);
  const years = parseInt(document.getElementById('calc-years').value);

  // Update the loan amount display as user changes down payment
  const principal = price - downPayment;
  document.getElementById('calc-principal').value =
    '$' + principal.toLocaleString();

  // Run the calculation
  const monthly = calculateMortgage(price, downPayment, annualRate, years);

  // Show the result
  document.getElementById('calc-output').textContent =
    '$' + monthly.toLocaleString() + '/mo';
  document.getElementById('calc-result').classList.remove('hidden');
}