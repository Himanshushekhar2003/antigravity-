function getSurgeCharge(targetDate) {
  // Convert incoming date to localized hour representation for stability (e.g. Asia/Kolkata)
  const d = new Date(targetDate);
  if (isNaN(d)) return 0;
  
  // Quick UTC+5:30 offset adjustment for India 
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  const nd = new Date(utc + (3600000 * 5.5));
  const hours = nd.getHours();
  
  if (hours === 21) return 15;
  if (hours === 22) return 20;
  if (hours === 23 || hours === 0) return 25;
  return 0;
}

function calculateOrderPricing(distanceKm, orderValue, targetDate = new Date()) {
  let minOrder = 0;
  let deliveryCharge = 0;
  
  if (distanceKm <= 2) {
    minOrder = 120;
    deliveryCharge = 10;
  } else if (distanceKm <= 5) {
    minOrder = 199;
    deliveryCharge = 25;
  } else if (distanceKm <= 10) {
    minOrder = 299;
    deliveryCharge = 40;
  } else {
    return {
      isValid: false,
      error: 'Delivery unavailable outside 10 km range'
    };
  }

  if (orderValue < minOrder) {
    return {
      isValid: false,
      error: `Minimum order value for this distance is ₹${minOrder}`
    };
  }

  const surgeCharge = getSurgeCharge(targetDate);

  return {
    isValid: true,
    deliveryCharge,
    surgeCharge,
    totalDeliveryCost: deliveryCharge + surgeCharge
  };
}

module.exports = { calculateOrderPricing };
