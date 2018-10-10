//Import Secrets
const fourSquare = require('../secrets').fourSquareConfig

//Import Libraries
const axios = require('axios')
const flatten = require('lodash/flatten')

//Foursquare Metadata
const CLIENT_ID = fourSquare.clientid
const CLIENT_SECRET = fourSquare.clientsecret
const VERSION_NUMBER = fourSquare.versionnumber

//Sample LatLongs (for testing)
const adilLatLong = '40.7630,-111.9011'
const johnLatLong = '43.0650,-89.3910'
const morganLatLong = '41.8083,-72.9195'

//Sample Restaurant IDs (for testing)
const MEXICAN_RESTAURANT = '4adf49fff964a5201f7921e3'
const PUB_RESTAURANT = '4ae7198ef964a52067a821e3'
const THE_ROSE_EST = '4ce4348bbebd370405afa4a0'

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
        //.response.venue; //attempt at parsing
    } catch (error) {
        console.error(error)
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
        const allVenuesThatHaveMenus = allVenues.filter(venue => venue.hasMenu)
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

// //TEST of getting all venues
;(async () => {
    console.log(
        JSON.stringify(
            await getAllVenues(adilLatLong, WALK, FOOD_GENERAL, 10),
            null,
            2
        )
    )
})()

// // TEST of getting a venue
// ;(async () => {
//     console.log(JSON.stringify(await getAVenuesDetails(THE_ROSE_EST), null, 2))
// })()

// //TEST of getting a venue menu
// (async () => {
//   console.log(JSON.stringify(await getAVenueMenu(PUB_RESTAURANT), null, 2));
// })();

// const allVenuesWithMenus = require('./getAllVenuesWithMenus.json')

// console.log(allVenuesWithMenus.filter(venue => venue.hasMenu))
