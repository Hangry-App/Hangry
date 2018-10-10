const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.returnVenues = functions.https.onRequest(async (req, res) => {
    //Import Libraries
    const axios = require('axios')
    const flatten = require('lodash.flatten')

    //Foursquare Metadata
    const CLIENT_ID = functions.config().foursquare.clientid
    const CLIENT_SECRET = functions.config().foursquare.clientsecret
    const VERSION_NUMBER = functions.config().foursquare.versionnumber

    //Sample LatLongs (for testing)
    const adilLatLong = '40.7630,-111.9011'
    const johnLatLong = '43.0650,-89.3910'
    const morganLatLong = '41.8083,-72.9195'

    //Sample Restaurant IDs (for testing)
    const MEXICAN_RESTAURANT = '4adf49fff964a5201f7921e3'
    const PUB_RESTAURANT = '4ae7198ef964a52067a821e3'

    //Food Standards
    const FOOD_GENERAL = '4d4b7105d754a06374d81259'
    const PIZZA = '4bf58dd8d48988d1ca941735'
    const AMERICAN = '4bf58dd8d48988d14e941735'
    const CHINESE = '4bf58dd8d48988d145941735'
    const SUSHI = '4bf58dd8d48988d1d2941735'
    const MEXICAN = '4bf58dd8d48988d1c1941735'
    const SALAD = '4bf58dd8d48988d1bd941735'
    const INDIAN = '4bf58dd8d48988d10f941735'
    const PERUVIAN = '4eb1bfa43b7b52c0e1adc2e8'
    const THAI = '4bf58dd8d48988d149941735'

    //Transportation Standards (in meters)
    const WALK = 1000
    const BIKE = 5000
    const DRIVE = 10000

    //Price Standards (in Foursquare metrics)
    const CHEAP = 1
    const MODERATE = 2
    const EXPENSIVE = 3
    const VERY_EXPENSIVE = 4

    //Helper Function
    const waitASec = () => {
        return new Promise((res, reject) => {
            setTimeout(() => {
                res(null)
            }, 1000)
        })
    }

    //GET a venue's details, used to return rating and tier
    let getAVenuesDetails = async venueId => {
        try {
            const response = await axios.get(
                `https://api.foursquare.com/v2/venues/${venueId}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`
            )
            return response.data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    let getAVenueMenu = async venueId => {
        try {
            const response = await axios.get(
                `https://api.foursquare.com/v2/venues/${venueId}/menu?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`
            )
            const responseData = response.data.response.menu.menus
            if (responseData.count > 0) {
                //check if there is a menu
                return flatten(
                    responseData.items[0].entries.items.map(
                        section => section.entries.items
                    )
                )
                    .map(menuItem => {
                        return {
                            name: menuItem.name || false,
                            description: menuItem.description || false,
                            price: menuItem.price || false,
                        }
                    })
                    .sort((a, b) => b.price - a.price)
                    .slice(0, 5) // only send back the top three
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
            return null
        }
    }

    //GET all venues, returns array of venues with details sorted by distance from lat, long
    let getAllVenues = async (latLong, radius, categoryId, limit = 10) => {
        try {
            const response = await axios.get(
                `https://api.foursquare.com/v2/venues/search`,
                {
                    params: {
                        ll: latLong,
                        radius,
                        limit,
                        categoryId,
                        client_id: CLIENT_ID, //eslint-disable-line camelcase
                        client_secret: CLIENT_SECRET, //eslint-disable-line camelcase
                        v: VERSION_NUMBER,
                    },
                }
            )
            const getVenueDetailsPromises = response.data.response.venues.map(
                async venues => {
                    const venueDetails = await getAVenuesDetails(venues.id)
                    await waitASec()

                    return {
                        restaurantId: venues.id,
                        name: venues.name,
                        distance: venues.location.distance,
                        lat: venues.location.lat,
                        long: venues.location.lng,
                        categoryId: venues.categories[0].id,
                        categoryShortName: venues.categories[0].shortName,
                        price: venueDetails.response.venue.price || 0,
                        rating: venueDetails.response.venue.rating || 0,
                        phone: venueDetails.response.venue.contact.phone,
                        hasMenu: venueDetails.response.venue.hasMenu || false,
                    }
                }
            )
            const allVenues = await Promise.all(getVenueDetailsPromises)
            const allVenuesThatHaveMenus = allVenues.filter(
                venue => venue.hasMenu
            )
            const venuesWithMenusPromises = allVenuesThatHaveMenus.map(
                async venue => {
                    const menuItems = await getAVenueMenu(venue.restaurantId)
                    await waitASec()
                    return {
                        ...venue,
                        menu: menuItems,
                    }
                }
            )
            const venuesWithMenus = await Promise.all(venuesWithMenusPromises)
            return venuesWithMenus
        } catch (error) {
            console.error(error)
        }
    }
    const rateVenues = (venues, userData) => {
        const calculateCategoryWeighted = (venue, userData) => {
            if (userData.categories[venue.categoryId]) {
                const preferredOutOfTen =
                    userData.categories[venue.categoryId] * 10
                const weightedTotal =
                    preferredOutOfTen * userData.weights.categories
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
            const weightedTotal =
                differenceOutOfTen * userData.weights.priceRange
            return weightedTotal || 0
        }
        const calculateRangeWeighted = (venue, userData, searchRange) => {
            const tensInt = 10 / searchRange
            const rangeOutOfTen = 10 - venue.distance * tensInt
            const weightedTotal =
                Math.ceil(rangeOutOfTen) * userData.weights.range
            return weightedTotal || 0
        }
        const calculateRatingWeighted = (venue, userData) => {
            const difference = Math.abs(venue.rating - userData.rating)
            const differenceOutOfTen = 10 - difference
            const weightedTotal = differenceOutOfTen * userData.weights.rating
            return weightedTotal
        }
        const calculateSavor = (venue, userData) => {
            const categoryScore = calculateCategoryWeighted(venue, userData)
            const priceScore = calculatePriceWeighted(venue, userData)
            const rangeScore = calculateRangeWeighted(
                venue,
                userData,
                req.query.distance
            )
            const ratingScore = calculateRatingWeighted(venue, userData)
            const savorScore = (
                categoryScore +
                priceScore +
                rangeScore +
                ratingScore
            ).toFixed(2)
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
    //TEST of getting all venues

    console.log('-----------------------------------')
    console.log('req.query')
    console.log(req.query)
    console.log('-----------------------------------')

    const usersVenues = await getAllVenues(
        `${req.query.lat},${req.query.long}`,
        `${req.query.distance}`,
        `${req.query.listOfCategories}`,
        10
    )

    console.log('-----------------------------------')
    console.log('Venues')
    console.log(usersVenues)
    console.log('-----------------------------------')

    const ratedVenues = rateVenues(usersVenues, {
        weights: {
            categories: req.query.categories,
            priceRange: req.query.priceTier,
            rating: req.query.rating,
            range: req.query.range,
        },
        categories: {
            '4d4b7105d754a06374d81259':
                req.query['4d4b7105d754a06374d81259'] || 0.0,
            '4bf58dd8d48988d1ca941735':
                req.query['4bf58dd8d48988d1ca941735'] || 0.0,
            '4bf58dd8d48988d14e941735':
                req.query['4bf58dd8d48988d14e941735'] || 0.0,
            '4bf58dd8d48988d145941735':
                req.query['4bf58dd8d48988d145941735'] || 0.0,
            '4bf58dd8d48988d1d2941735':
                req.query['4bf58dd8d48988d1d2941735'] || 0.0,
            '4bf58dd8d48988d1c1941735':
                req.query['4bf58dd8d48988d1c1941735'] || 0.0,
            '4bf58dd8d48988d1bd941735':
                req.query['4bf58dd8d48988d1bd941735'] || 0.0,
            '4bf58dd8d48988d10f941735':
                req.query['4bf58dd8d48988d10f941735'] || 0.0,
            '4eb1bfa43b7b52c0e1adc2e8':
                req.query['4eb1bfa43b7b52c0e1adc2e8'] || 0.0,
            '4bf58dd8d48988d149941735':
                req.query['4bf58dd8d48988d149941735'] || 0.0,
        },
        priceTier: req.query.priceTier,
        rating: req.query.ratingPref,
        distance: req.query.distance,
    })
    console.log('-----------------------------------')
    console.log('Rated Venues')
    console.log(ratedVenues)
    console.log('-----------------------------------')
    res.send(ratedVenues)
})
