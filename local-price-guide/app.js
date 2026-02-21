(function () {
  'use strict';

  // Sample data: category -> items -> { markets: { name, price, note }, low, typical, high } — all prices in KES
  const CURRENCY = 'KES';
  const DATA = {
    food: {
      label: 'Food & Restaurants',
      items: {
        'Local lunch (one person)': {
          low: 400,
          typical: 800,
          high: 2000,
          markets: [
            { name: 'Street food / local stall', price: 400, note: 'Fair local price' },
            { name: 'Local restaurant (no menu in your language)', price: 650, note: 'Typical' },
            { name: 'Restaurant in tourist area', price: 1500, note: 'Often inflated' },
            { name: 'Hotel restaurant', price: 2000, note: 'Highest range' },
          ],
        },
        'Dinner (one person)': {
          low: 800,
          typical: 1500,
          high: 4500,
          markets: [
            { name: 'Local eatery', price: 900, note: 'Fair' },
            { name: 'Mid-range local restaurant', price: 1500, note: 'Typical' },
            { name: 'Tourist strip restaurant', price: 3200, note: 'Often overpriced' },
            { name: 'Upscale / hotel', price: 4500, note: 'Premium' },
          ],
        },
        'Bottle of water (0.5L)': {
          low: 40,
          typical: 100,
          high: 400,
          markets: [
            { name: 'Supermarket / kiosk', price: 50, note: 'Fair' },
            { name: 'Corner shop', price: 90, note: 'Typical' },
            { name: 'Street vendor (tourist zone)', price: 200, note: 'Higher' },
            { name: 'Hotel / attraction', price: 400, note: 'Often inflated' },
          ],
        },
      },
    },
    transport: {
      label: 'Transport',
      items: {
        'Short taxi ride (5 km)': {
          low: 500,
          typical: 1000,
          high: 3200,
          markets: [
            { name: 'Metered taxi (Bolt/Uber)', price: 650, note: 'Fair' },
            { name: 'Agreed price, local knowledge', price: 1000, note: 'Typical' },
            { name: 'Taxi at tourist spot (no meter)', price: 2300, note: 'Often overcharged' },
            { name: 'Hotel taxi', price: 3200, note: 'Premium' },
          ],
        },
        'One-way matatu / bus': {
          low: 40,
          typical: 100,
          high: 260,
          markets: [
            { name: 'Matatu (cash)', price: 50, note: 'Fair' },
            { name: 'City bus (BRT)', price: 80, note: 'Typical' },
            { name: 'Tourist shuttle', price: 260, note: 'Convenience premium' },
          ],
        },
        'Airport transfer (one way)': {
          low: 2000,
          typical: 3900,
          high: 10500,
          markets: [
            { name: 'Public bus / shared van', price: 2000, note: 'Cheapest' },
            { name: 'Prebooked transfer', price: 3600, note: 'Typical' },
            { name: 'Airport taxi (no prebooking)', price: 7200, note: 'Often high' },
            { name: 'Hotel limousine', price: 10500, note: 'Premium' },
          ],
        },
      },
    },
    accommodation: {
      label: 'Accommodation',
      items: {
        'Budget room (per night)': {
          low: 2600,
          typical: 5800,
          high: 12000,
          markets: [
            { name: 'Hostel / guesthouse (local area)', price: 2900, note: 'Fair' },
            { name: 'Local budget hotel', price: 5200, note: 'Typical' },
            { name: 'Budget place near tourist area', price: 9100, note: 'Higher' },
            { name: 'Last-minute / walk-in tourist zone', price: 12000, note: 'Often inflated' },
          ],
        },
        'Mid-range room (per night)': {
          low: 6500,
          typical: 13000,
          high: 26000,
          markets: [
            { name: 'Local 3-star (booked online)', price: 7200, note: 'Fair' },
            { name: 'Central 3-star', price: 12400, note: 'Typical' },
            { name: 'Tourist-area hotel', price: 19500, note: 'Higher' },
            { name: 'Same hotel, walk-in rate', price: 26000, note: 'Often overpriced' },
          ],
        },
      },
    },
    groceries: {
      label: 'Groceries',
      items: {
        'Milk (1L)': {
          low: 100,
          typical: 200,
          high: 400,
          markets: [
            { name: 'Supermarket (Naivas/Tuskys)', price: 120, note: 'Fair' },
            { name: 'Local grocery', price: 180, note: 'Typical' },
            { name: 'Mini-mart near hotel', price: 330, note: 'Higher' },
          ],
        },
        'Bread (loaf)': {
          low: 65,
          typical: 150,
          high: 400,
          markets: [
            { name: 'Local bakery', price: 80, note: 'Fair' },
            { name: 'Supermarket', price: 140, note: 'Typical' },
            { name: 'Hotel / convenience', price: 400, note: 'Often inflated' },
          ],
        },
        'Fruits (approx. 1 kg)': {
          low: 200,
          typical: 400,
          high: 1000,
          markets: [
            { name: 'Local market', price: 230, note: 'Fair' },
            { name: 'Supermarket', price: 360, note: 'Typical' },
            { name: 'Street vendor (tourist area)', price: 780, note: 'Often overcharged' },
          ],
        },
      },
    },
    services: {
      label: 'Services',
      items: {
        'Haircut (men)': {
          low: 650,
          typical: 1500,
          high: 4500,
          markets: [
            { name: 'Local barber', price: 780, note: 'Fair' },
            { name: 'Neighborhood salon', price: 1400, note: 'Typical' },
            { name: 'Hotel salon', price: 3900, note: 'Premium' },
          ],
        },
        'Laundry (per kg)': {
          low: 130,
          typical: 325,
          high: 780,
          markets: [
            { name: 'Self-service / local laundromat', price: 160, note: 'Fair' },
            { name: 'Local laundry service', price: 290, note: 'Typical' },
            { name: 'Hotel laundry', price: 780, note: 'Often very high' },
          ],
        },
        'SIM card (prepaid, basic)': {
          low: 390,
          typical: 1040,
          high: 3250,
          markets: [
            { name: 'Safaricom/Airtel shop', price: 650, note: 'Fair' },
            { name: 'Airport kiosk', price: 1950, note: 'Convenience premium' },
            { name: 'Hotel / tour desk', price: 3250, note: 'Often inflated' },
          ],
        },
      },
    },
    drinks: {
      label: 'Drinks & Beverages',
      items: {
        'Local beer (bar)': {
          low: 260,
          typical: 520,
          high: 1300,
          markets: [
            { name: 'Local bar', price: 325, note: 'Fair' },
            { name: 'Neighborhood pub', price: 520, note: 'Typical' },
            { name: 'Tourist bar / waterfront', price: 1170, note: 'Often overpriced' },
          ],
        },
        'Coffee': {
          low: 150,
          typical: 330,
          high: 780,
          markets: [
            { name: 'Street stall / local café', price: 170, note: 'Fair' },
            { name: 'Standard café', price: 290, note: 'Typical' },
            { name: 'Hotel / chain in tourist area', price: 650, note: 'Higher' },
          ],
        },
      },
    },
    souvenirs: {
      label: 'Souvenirs & Shopping',
      items: {
        'T-shirt (standard)': {
          low: 650,
          typical: 1950,
          high: 5200,
          markets: [
            { name: 'Local market (negotiate)', price: 1040, note: 'Fair' },
            { name: 'Fixed-price shop', price: 1820, note: 'Typical' },
            { name: 'Airport / hotel shop', price: 4550, note: 'Often inflated' },
          ],
        },
        'Handicraft (small)': {
          low: 650,
          typical: 2600,
          high: 7800,
          markets: [
            { name: 'Artisan market', price: 1560, note: 'Fair' },
            { name: 'Tourist market (negotiate)', price: 3250, note: 'Start lower' },
            { name: 'Boutique / hotel', price: 7150, note: 'Premium' },
          ],
        },
      },
    },
  };

  const categorySelect = document.getElementById('category');
  const itemSelect = document.getElementById('item');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultsSection = document.getElementById('results');
  const emptyState = document.getElementById('emptyState');
  const resultsTitle = document.getElementById('resultsTitle');
  const priceSummary = document.getElementById('priceSummary');
  const marketsGrid = document.getElementById('marketsGrid');
  const tipsCard = document.getElementById('tipsCard');

  function formatMoney(n) {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: CURRENCY,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);
  }

  function populateItems() {
    const categoryId = categorySelect.value;
    itemSelect.innerHTML = '<option value="">— Select item —</option>';
    itemSelect.disabled = !categoryId;
    analyzeBtn.disabled = true;

    if (!categoryId || !DATA[categoryId]) return;

    const category = DATA[categoryId];
    Object.keys(category.items).forEach(function (key) {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key;
      itemSelect.appendChild(opt);
    });
    itemSelect.disabled = false;
  }

  function onItemChange() {
    analyzeBtn.disabled = !itemSelect.value;
  }

  function showResults() {
    const categoryId = categorySelect.value;
    const itemKey = itemSelect.value;
    if (!categoryId || !itemKey || !DATA[categoryId] || !DATA[categoryId].items[itemKey]) {
      return;
    }

    const item = DATA[categoryId].items[itemKey];
    const globalMin = item.low;
    const globalMax = Math.max(item.high, ...item.markets.map(function (m) { return m.price; }));

    resultsTitle.textContent = 'Price analysis: ' + itemKey;
    resultsSection.hidden = false;
    emptyState.classList.add('hidden-section');

    // Summary cards
    priceSummary.innerHTML =
      '<div class="summary-card low">' +
      '<div class="label">Low (fair)</div>' +
      '<div class="value">' + formatMoney(item.low) + '</div></div>' +
      '<div class="summary-card mid">' +
      '<div class="label">Typical</div>' +
      '<div class="value">' + formatMoney(item.typical) + '</div></div>' +
      '<div class="summary-card high">' +
      '<div class="label">High (possible overcharge)</div>' +
      '<div class="value">' + formatMoney(item.high) + '</div></div>';

    // Market cards with bar
    marketsGrid.innerHTML = '';
    item.markets.forEach(function (m) {
      const pctLow = ((item.typical - globalMin) / (globalMax - globalMin || 1)) * 100;
      const pctMid = ((item.high - item.typical) / (globalMax - globalMin || 1)) * 100;
      const pctHigh = 100 - pctLow - pctMid;

      const pos = (m.price - globalMin) / (globalMax - globalMin || 1);
      let segLow = Math.min(100, Math.max(0, (item.typical - globalMin) / (globalMax - globalMin || 1) * 100));
      let segMid = Math.min(100 - segLow, Math.max(0, (item.high - item.typical) / (globalMax - globalMin || 1) * 100));
      let segHigh = 100 - segLow - segMid;

      let barSegment = 'low';
      if (m.price > item.high) barSegment = 'high';
      else if (m.price > item.typical) barSegment = 'mid';

      const markerPos = Math.min(100, Math.max(0, pos * 100));

      const card = document.createElement('div');
      card.className = 'market-card';
      card.innerHTML =
        '<h3>' + m.name + '</h3>' +
        '<div class="market-meta">' + formatMoney(m.price) + ' — ' + m.note + '</div>' +
        '<div class="price-bar-wrap">' +
        '<span class="price-bar-segment low" style="width: ' + segLow + '%"></span>' +
        '<span class="price-bar-segment mid" style="width: ' + segMid + '%"></span>' +
        '<span class="price-bar-segment high" style="width: ' + segHigh + '%"></span>' +
        '</div>' +
        '<div class="price-bar-labels">' +
        '<span>' + formatMoney(globalMin) + '</span>' +
        '<span>' + formatMoney(globalMax) + '</span>' +
        '</div>';
      marketsGrid.appendChild(card);
    });

    // Tips
    tipsCard.innerHTML =
      '<h4>Tips to avoid overpaying</h4>' +
      '<ul>' +
      '<li>Prices in tourist areas and at hotels are often 2–3x local levels. Compare with this range before paying.</li>' +
      '<li>When possible, buy from local markets, supermarkets, or local-run places rather than airport/hotel vendors.</li>' +
      '<li>For taxis, agree on a price before riding or use a metered/local app; avoid unsolicited drivers at tourist spots.</li>' +
      '<li>Negotiate politely at markets and street vendors; walking away often brings a better offer.</li>' +
      '<li>Ask a trusted local (e.g. your guesthouse host) for typical prices for transport and common items.</li>' +
      '</ul>';
  }

  categorySelect.addEventListener('change', populateItems);
  itemSelect.addEventListener('change', onItemChange);
  analyzeBtn.addEventListener('click', showResults);

  populateItems();
})();
