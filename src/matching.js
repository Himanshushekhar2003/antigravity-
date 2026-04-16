function findBestRider(riders) {
  if (!riders || riders.length === 0) return null;

  // Step 1: Filter nearby riders (distance < 3km)
  const availableRiders = riders.filter(rider => rider.distance < 3);

  if (availableRiders.length === 0) return null;

  // Step 2: Score Each Rider (Avoid Mutation)
  const scoredRiders = availableRiders.map(rider => {
    return {
      ...rider,
      score: (rider.distance * 0.5) + (rider.currentLoad * 0.3) + (rider.delayRisk * 0.2)
    };
  });

  // Step 3: Select Best Rider (Lowest Score)
  scoredRiders.sort((a, b) => a.score - b.score);

  return scoredRiders[0];
}

module.exports = { findBestRider };
