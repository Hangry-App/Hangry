const dummyData = [
  { restaurantId: '4b803cb7f964a520925f30e3',
  name: 'Maharani Indian Restaurant',
  distance: 744,
  lat: 43.071509668071776,
  long: -89.38888206607986,
  categoryId: '4bf58dd8d48988d10f941735',
  categoryShortName: 'Indian',
  price: { tier: 2, message: 'Moderate', currency: '$' },
  rating: 7.3,
  phone: '6082519999',
  hasMenu: true,
  menu: [ [Object], [Object], [Object], [Object], [Object] ],
}
  ]
  

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
    "categories" : 0.7,
    "priceRange" : 0.9,
    "range" : 0.5,
    "rating" : 0.3
  }
}

const rateVenues = (venues, userData) => {
  const calculatePriceWeighted = (venue, userData) => {
      const venuePriceOutOfTen = 10 - venue.price.tier * 2.5
      const preferredPriceOutOfTen = 10 - userData.priceTier * 2.5 
      const difference = Math.abs( venuePriceOutOfTen - preferredPriceOutOfTen )
      const differenceOutOfTen = 10 - difference
      const weightedTotal = differenceOutOfTen * userData.weights.priceRange 
      return weightedTotal
  }
  const calculateRangeWeighted = (venue, userData, searchRange) => {
      const tensInt = 10 / searchRange
      const rangeOutOfTen = 10 - venue.distance * tensInt
      const weightedTotal =  Math.ceil(rangeOutOfTen) * userData.weights.range
      return weightedTotal
  } 
  const calculateRatingWeighted = (venue, userData) => {
      const difference = Math.abs(venue.rating - userData.rating)
      const differenceOutOfTen = 10 - difference
      const weightedTotal = differenceOutOfTen * userData.weights.rating
      return weightedTotal
  }
  const calculateSavor = (venue, userData) => {
      const priceScore = calculatePriceWeighted(venue, userData)
      const rangeScore = calculateRangeWeighted(venue, userData, 5000)
      const ratingScore = calculateRatingWeighted(venue, userData)
      console.log(priceScore, rangeScore, ratingScore);
      const savorScore = (((priceScore + rangeScore + ratingScore) / (userData.weights.priceRange + userData.weights.range + userData.weights.rating)) * 10).toFixed()
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