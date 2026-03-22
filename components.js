//Takes one property object, returns an HTML string for that card
function createPropertyCard(property) {
    return `
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">

            <div class="relative">
                <img src="${property.img}" alt="${property.title}" class="w-full h-44 object-cover"/>
                <span class="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full
                    ${getBadgeClasses(property.type)}">
                    ${getBadgeLabel(property.type)}
                </span>
            </div>

            <div class="p-4">
                <p class="text-2x1 font-bold text-gray-900">
                    ${formatPrice(property.price, property.type)}
                </p>
                <p class="text-sm font-medium text-gray-700 mt-1 truncate">
                    ${property.title}
                </p>
                <div class="flex gap-4 mt-3 text-sm text-gray-500">
                    <span>${formatBeds(property.beds)}</span>
                    <span>${property.baths} bath</span>
                    <span>${property.sqft.toLocaleString()} sqft</span>
                </div>
                <p class="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                    ${property.city}
                </p>

                ${property.type === 'buy' ? createMortgageCalculator(property.price) : ''}

            </div>

        </div>
    `;
}


function createMortgageCalculator(price) {
  return `
    <div class="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">

      <p class="text-sm font-semibold text-gray-700 mb-3">
        Mortgage estimator
      </p>

      <div class="grid grid-cols-2 gap-3 mb-3">

        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Down payment ($)</label>
          <input
            id="calc-down"
            type="number"
            value="${Math.round(price * 0.2)}"
            class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Interest rate (%)</label>
          <input
            id="calc-rate"
            type="number"
            value="5"
            step="0.1"
            class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Amortization (years)</label>
          <input
            id="calc-years"
            type="number"
            value="25"
            class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs text-gray-500">Loan amount ($)</label>
          <input
            id="calc-principal"
            type="text"
            disabled
            value="$${(price - Math.round(price * 0.2)).toLocaleString()}"
            class="border border-gray-100 rounded-lg px-3 py-2 text-sm bg-white text-gray-400"
          />
        </div>

      </div>

      <button
        onclick="runCalculator(${price})"
        class="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
      >
        Calculate
      </button>

      <div id="calc-result" class="mt-3 hidden">
        <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-teal-200">
          <span class="text-sm text-gray-600">Est. monthly payment</span>
          <span id="calc-output" class="text-lg font-bold text-teal-700"></span>
        </div>
        <p class="text-xs text-gray-400 mt-2">
          Estimate only. Does not include property tax, insurance, or CMHC premiums.
        </p>
      </div>

    </div>
  `;
}