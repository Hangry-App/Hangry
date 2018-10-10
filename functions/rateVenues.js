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
const calculateSavor = (venue, userData, searchRange) => {
    const priceScore = calculatePriceWeighted(venue, userData)
    const rangeScore = calculateRangeWeighted(venue, userData, searchRange)
    const ratingScore = calculateRatingWeighted(venue, userData)
    const savorScore = (priceScore + rangeScore + ratingScore).toFixed(2)
    return savorScore
}
const rateVenues = (venues, userData, searchRange) => {
    const keyedVenues = [];
    venues.forEach(venue => {
        const venueWithScore = venue;
        venueWithScore.savorScore = calculateSavor(venues, userData, searchRange);
        keyedVenues.push(venueWithScore);
    })
    return keyedVenues.sort((a, b) => b.savorScore - a.savorScore);
}

module.exports = rateVenues;