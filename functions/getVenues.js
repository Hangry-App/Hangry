const functions = require('firebase-functions')
const axios = require('axios');
const flatten = require('lodash.flatten');

const CLIENT_ID = functions.config().foursquare.clientid;
const CLIENT_SECRET = functions.config().foursquare.clientsecret;
const VERSION_NUMBER = functions.config().foursquare.versionnumber;

const waitASec = () => {
    return new Promise((res, reject) => {
        setTimeout(() => {
            res(null)
        }, 1000)
    })
}

//GET a venue's details, used to return rating and tier
const getAVenuesDetails = async venueId => {
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

const getAVenueMenu = async venueId => {
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
const getAllVenues = async (latLong, radius, categoryId, limit = 10) => {
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

module.exports = getAllVenues