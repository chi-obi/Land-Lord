//Takes one property object, returns an HTML string for that card
function createPropertyCard(property, activeCurrency, rates) {
  const priceDisplay = displayPrice(property, activeCurrency, rates);
  const isRent = property.type === 'rent';

  return `
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

      <div class="relative">
        <img
          src="${property.img}"
          alt="${property.title}"
          class="w-full h-44 object-cover"
        />
        <span class="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full
          ${getBadgeClasses(property.type)}">
          ${getBadgeLabel(property.type)}
        </span>
        <span class="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-500">
          Listed in ${property.currency}
        </span>
      </div>

      <div class="p-4">
        <p class="text-2xl font-bold text-gray-900">
          ${priceDisplay}${isRent ? '<span class="text-sm font-normal text-gray-400">/mo</span>' : ''}
        </p>
        <p class="text-sm font-medium text-gray-700 mt-1 truncate">${property.title}</p>

        <div class="flex gap-4 mt-3 text-sm text-gray-500">
          <span>${formatBeds(property.beds)}</span>
          <span>${property.baths} bath</span>
          <span>${property.sqft.toLocaleString()} sqft</span>
        </div>

        <p class="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
          ${property.city}
        </p>

        ${!isRent ? createMortgageCalculator(property, activeCurrency, rates) : ''}
      </div>

    </div>
  `;
}


function createMortgageCalculator(property, activeCurrency, rates) {
  const downPaymentDefault = Math.round(property.price * 0.2);

  return `
    <div class="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <p class="text-sm font-semibold text-gray-700 mb-3">Mortgage estimator</p>

      <div class="grid grid-cols-2 gap-3 mb-3">
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Down payment (${property.currency})</label>
          <input id="calc-down-${property.id}" type="number" value="${downPaymentDefault}"
            class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Interest rate (%)</label>
          <input id="calc-rate-${property.id}" type="number" value="5" step="0.1"
            class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Amortization (years)</label>
          <input id="calc-years-${property.id}" type="number" value="25"
            class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"/>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Loan amount (${property.currency})</label>
          <input id="calc-principal-${property.id}" type="text" disabled
            value="${formatCurrency(property.price - downPaymentDefault, property.currency)}"
            class="border border-gray-100 rounded-lg px-3 py-2 text-sm bg-white text-gray-400"/>
        </div>
      </div>

      <button
        onclick="runCalculator(${property.id}, ${property.price}, '${property.currency}')"
        class="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
        Calculate
      </button>

      <div id="calc-result-${property.id}" class="mt-3 hidden">
        <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-teal-200">
          <span class="text-sm text-gray-600">Est. monthly payment</span>
          <span id="calc-output-${property.id}" class="text-lg font-bold text-teal-700"></span>
        </div>
        <p class="text-xs text-gray-400 mt-2">
          Estimate only. Does not include tax, insurance, or local fees.
        </p>
      </div>
    </div>
  `;
}