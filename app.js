// Grid container
const grid = document.getElementById('card-grid');
grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8';

// API key called from rates.js
async function fetchExchangeRates() {
  const response = await fetch('/.netlify/functions/rates');
  const data = await response.json();
  return data.conversion_rates;
}

// These two variables are the shared state for the whole app
let exchangeRates = null;
let activeCurrency = 'USD';

const activeFilters = {
  type: 'all',
  city: 'all',
  beds: 0,
  maxPrice: null
};

// Fetches live rates once when the page loads
// All rates come back relative to USD e.g. { USD: 1, CAD: 1.36, NGN: 1580, AUD: 1.53 }
async function fetchExchangeRates() {
  const response = await fetch('/.netlify/functions/rates');
  const data = await response.json();
  return data.conversion_rates;
}

function populateCityFilter() {
  const citySelect = document.getElementById('filter-city');
  const cities = [...new Set(properties.map(p => p.city))];
  cities.forEach(function(city) {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

function updateResultsCount(filtered, total) {
  const counter = document.getElementById('results-count');
  if (filtered === total) {
    counter.textContent = 'Showing all ' + total + ' listings';
  } else {
    counter.textContent = 'Showing ' + filtered + ' of ' + total + ' listings';
  }
}

function renderCards(propertyList) {
  grid.innerHTML = propertyList
    .map(property => createPropertyCard(property, activeCurrency, exchangeRates))
    .join('');
  updateResultsCount(propertyList.length, properties.length);
}

function applyFilters() {
  const filtered = filterProperties(properties, activeFilters);
  renderCards(filtered);
}

function runCalculator(propertyId, price, propertyCurrency) {
  const down = parseInt(document.getElementById('calc-down-' + propertyId).value);
  const rate = parseFloat(document.getElementById('calc-rate-' + propertyId).value);
  const years = parseInt(document.getElementById('calc-years-' + propertyId).value);

  // Update the loan amount display
  const principal = price - down;
  document.getElementById('calc-principal-' + propertyId).value =
    formatCurrency(principal, propertyCurrency);

  // Calculate in the listing's original currency
  const monthlyInOriginal = calculateMortgage(price, down, rate, years);

  // Convert monthly payment to whatever currency the user has selected
  const monthlyConverted = convertPrice(
    monthlyInOriginal,
    propertyCurrency,
    activeCurrency,
    exchangeRates
  );

  // Display result
  document.getElementById('calc-output-' + propertyId).textContent =
    formatCurrency(monthlyConverted, activeCurrency) + '/mo';
  document.getElementById('calc-result-' + propertyId).classList.remove('hidden');
}



// Currency toggle — user picks a currency, everything re-renders
document.getElementById('currency-select').addEventListener('change', function(e) {
  activeCurrency = e.target.value;
  applyFilters();
});

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

// Kicks everything off — fetch rates first, then render
async function init() {
  document.getElementById('card-grid').innerHTML =
    '<p class="col-span-3 text-center text-gray-400 py-12">Loading listings...</p>';

  exchangeRates = await fetchExchangeRates();
  populateCityFilter();
  applyFilters();
}

init();