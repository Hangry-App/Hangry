const dummyData = [ { restaurantId: '4b743a15f964a52051ce2de3',
name: 'Meadow Asia Cuisine',
distance: 10791,
lat: 41.86067711284444,
long: -72.80999210074046,
categoryId: '4bf58dd8d48988d142941735',
categoryShortName: 'Asian',
price: { tier: 3, message: 'Expensive', currency: '$' },
rating: 8.5,
phone: '8604089800',
hasMenu: true,
menu: false },
{ restaurantId: '4c47856489a6c9b6ae969a88',
name: 'Yume',
distance: 6364,
lat: 41.7566528898942,
long: -72.88584745458607,
categoryId: '4bf58dd8d48988d1d2941735',
categoryShortName: 'Sushi',
price: { tier: 2, message: 'Moderate', currency: '$' },
rating: 8.7,
phone: '8603217463',
hasMenu: true,
menu: false } ]
const dummyUserData = {
  "categories" : {
    "4bf58dd8d48988d10f941735" : 0.5,
    "4bf58dd8d48988d145941735" : 0.5,
    "4bf58dd8d48988d149941735" : 0.5,
    "4bf58dd8d48988d14e941735" : 0,
    "4bf58dd8d48988d1ca941735" : 0,
    "4bf58dd8d48988d1d2941735" : 0.5,
    "4d4b7105d754a06374d81259" : 0,
    "4eb1bfa43b7b52c0e1adc2e8" : 0.5
  },
  "distance" : 1000,
  "priceTier" : 1,
  "rating" : 1,
  "weights" : {
    "categories" : 0,
    "priceRange" : 9,
    "range" : 0,
    "rating" : 0
  }
}

const rateVenues = (venues, userData) => {
  const calculateCategoryWeighted = (venue, userData) => {
      if (userData.categories[venue.categoryId]) {
          const preferredOutOfTen = userData.categories[venue.categoryId] * 10
          const weightedTotal = preferredOutOfTen * (userData.weights.categories + userData.weights.priceRange + userData.weights.rating + userData.weights.range);
          return weightedTotal
      } else {
          return 0
      }
  }

  const calculatePriceWeighted = (venue, userData) => {
      const venuePriceOutOfTen = 10 - venue.price.tier * 2.5
      const preferredPriceOutOfTen = 10 - userData.priceTier * 2.5 
      const difference = Math.abs(
          venuePriceOutOfTen - preferredPriceOutOfTen
      )
      const differenceOutOfTen = 10 - difference
      const weightedTotal = differenceOutOfTen * (userData.weights.priceRange * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10)) 
      return weightedTotal || 0
  }
  const calculateRangeWeighted = (venue, userData, searchRange) => {
      const tensInt = 10 / searchRange
      const rangeOutOfTen = 10 - venue.distance * tensInt
      const weightedTotal =  Math.ceil(rangeOutOfTen) * (userData.weights.range * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10))
      return weightedTotal || 0
  } 
  const calculateRatingWeighted = (venue, userData) => {
      const difference = Math.abs(venue.rating - userData.rating)
      const differenceOutOfTen = 10 - difference
      const weightedTotal = differenceOutOfTen * (userData.weights.rating * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10))
      return weightedTotal
  }
  const calculateSavor = (venue, userData) => {
      const categoryScore = calculateCategoryWeighted(venue, userData)
      const priceScore = calculatePriceWeighted(venue, userData)
      const rangeScore = calculateRangeWeighted(venue, userData, 5000)
      const ratingScore = calculateRatingWeighted(venue, userData)
      console.log(categoryScore, priceScore, rangeScore, ratingScore);
      const savorScore = (categoryScore + priceScore + rangeScore + ratingScore).toFixed(2)
      return savorScore
  }
  const addScore = (venues, userData) => {
      const keyedVenues = []
      venues.forEach(venue => { 
          const venueWithScore = venue
          venueWithScore.savorScore = calculateSavor(venue, userData)
          keyedVenues.push(venueWithScore)
      })
      return keyedVenues.sort((a, b) => b.savorScore - a.savorScore)
  }
  return addScore(venues, userData)
}

const test = rateVenues(dummyData, dummyUserData);
console.log(test);