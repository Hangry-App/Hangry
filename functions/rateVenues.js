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
    console.log(priceScore + rangeScore + ratingScore, userData.weights.priceRange + userData.weights.rating + userData.weights.range);
    const savorScore = (((priceScore + rangeScore + ratingScore) / (userData.weights.priceRange + userData.weights.range + userData.weights.rating)) * 10).toFixed()
    return savorScore
}
const rateVenues = (venues, userData) => { 
    const keyedVenues = [];
    venues.forEach(venue => {
        const venueWithScore = venue;
        venueWithScore.savorScore = calculateSavor(venues, userData, userData.distance);
        keyedVenues.push(venueWithScore);
    })
    return keyedVenues.sort((a, b) => b.savorScore - a.savorScore);
}

module.exports = rateVenues;