const calculateCategoryWeighted = (venue, userData) => {
  if (userData.categories[venue.categoryId]) {
    const preferredOutOfTen = userData.categories[venue.categoryId] * 10;
    const weightedTotal = preferredOutOfTen * userData.weights.categories;
    return weightedTotal;
  } else {
    return 0;
  }
};
const calculatePriceWeighted = (venue, userData) => {
  const venuePriceOutOfTen = 10 - venue.price.tier * 2.5;
  const preferredPriceOutOfTen = 10 - userData.priceTier * 2.5;
  const difference = Math.abs(venuePriceOutOfTen - preferredPriceOutOfTen);
  const differenceOutOfTen = 10 - difference;
  const weightedTotal = differenceOutOfTen * userData.weights.priceRange;
  return weightedTotal || 0;
};
const calculateRangeWeighted = (venue, userData, searchRange) => {
  const tensInt = 10 / searchRange;
  const rangeOutOfTen = 10 - venue.distance * tensInt;
  const weightedTotal = Math.ceil(rangeOutOfTen) * userData.weights.range;
  return weightedTotal || 0;
};
const calculateRatingWeighted = (venue, userData) => {
  const difference = Math.abs(venue.rating - userData.rating);
  const differenceOutOfTen = 10 - difference;
  const weightedTotal = differenceOutOfTen * userData.weights.rating;
  return weightedTotal;
};
const calculateSavor = (venue, userData) => {
  const categoryScore = calculateCategoryWeighted(venue, userData);
  const priceScore = calculatePriceWeighted(venue, userData);
  const rangeScore = calculateRangeWeighted(venue, userData, 12000);
  const ratingScore = calculateRatingWeighted(venue, userData);
  const savorScore = (
    categoryScore +
    priceScore +
    rangeScore +
    ratingScore
  ).toFixed(2);
  return savorScore;
};

const rateVenue = (venues, userData) => {
  const keyedVenues = [];
  venues.forEach(venue => {
    keyedVenues.push({ ...venue, savorScore: calculateSavor(venue, userData) });
  });
  return keyedVenues.sort((a, b) => b.savorScore - a.savorScore);
};
