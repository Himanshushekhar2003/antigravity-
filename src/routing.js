function generateBatchRoute(orders) {
  if (!orders || orders.length === 0) return [];

  const pickups = [];
  const drops = [];

  orders.forEach(order => {
    pickups.push({
      action: 'PICKUP',
      orderId: order.id,
      locationId: order.shopId
    });
    drops.push({
      action: 'DROP',
      orderId: order.id,
      locationId: order.customerId
    });
  });

  // Base Logic: All Pickups first, then Deliveries
  return [...pickups, ...drops];
}

module.exports = { generateBatchRoute };
