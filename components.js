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
            </div>

        </div>
    `;
}