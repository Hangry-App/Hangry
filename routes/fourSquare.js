//Import Secrets
const fourSquare = require('../secrets').fourSquareConfig;
//Import Libraries
const axios = require('axios');

//Sample responses
const sampleVenuesDetail = require('./SampleResponses/venueDetailsResponse.json');
const sampleMenuDetails = require('./SampleResponses/menuResponse.json');

//Foursquare Metadata
const CLIENT_ID = fourSquare.clientId;
const CLIENT_SECRET = fourSquare.clientSecret;
const VERSION_NUMBER = fourSquare.versionNumber;

//Sample LatLongs (for testing)
const adilLatLong = '40.7630,-111.9011';
const johnLatLong = '43.0650,-89.3910';
const morganLatLong = '41.8083,-72.9195';

//Sample Restaurant IDs (for testing)
const MEXICAN_RESTAURANT = '4adf49fff964a5201f7921e3';

//Food Standards
const FOOD_GENERAL = '4d4b7105d754a06374d81259';
const PIZZA = '4bf58dd8d48988d1ca941735';
const AMERICAN = '4bf58dd8d48988d14e941735';
const CHINESE = '4bf58dd8d48988d145941735';
const SUSHI = '4bf58dd8d48988d1d2941735';
const MEXICAN = '4bf58dd8d48988d1c1941735';
const SALAD = '4bf58dd8d48988d1bd941735';
const INDIAN = '4bf58dd8d48988d10f941735';
const PERUVIAN = '4eb1bfa43b7b52c0e1adc2e8';
const THAI = '4bf58dd8d48988d149941735';

//Transportation Standards (in meters)
const WALK = 1000;
const BIKE = 5000;
const DRIVE = 10000;

//Price Standards (in Foursquare metrics)
const CHEAP = 1;
const MODERATE = 2;
const EXPENSIVE = 3;
const VERY_EXPENSIVE = 4;

//GET a venue's details, used to return rating and tier
let getAVenuesDetails = async venueId => {
  try {
    const response = await axios.get(
      `https://api.foursquare.com/v2/venues/${venueId}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`
    );
    return response.data;
    //.response.venue; //attempt at parsing
  } catch (error) {
    console.error(error);
  }
};

let getAVenueMenu = async venueId => {
  try {
    const response = await axios.get(
      `https://api.foursquare.com/v2/venues/${venueId}/menu?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`
    );
    const responseData = response.data.response.menu.menus;
    if (responseData.count > 0) {
      //check if there is a menu
      return responseData.items[0].entries.items
        .map(section => section.entries.items[0]) //flatten the menu
        .map(menuItem => {
          return {
            name: menuItem.name,
            description: menuItem.description,
            price: menuItem.price
          };
        }) //only send back the name, description, and price
        .sort((a, b) => b.price - a.price) //sort the menus by price high to low
        .slice(0, 3); // only send back the top three
    } else {
      return 'No Menu Items';
    }
  } catch (error) {
    console.error(error);
  }
};

//GET all venues, returns array of venues with details sorted by distance from lat, long
let getAllVenues = async (latLong, radius, categoryId, limit = 20) => {
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
          v: VERSION_NUMBER
        }
      }
    );
    const dataPromises = response.data.response.venues.map(async venues => {
      // const venueDetails = await getAVenuesDetails(venues.id);
      // const menuItems = await getAVenueMenu(venues.id);
      return {
        restaurantId: venues.id,
        name: venues.name,
        distance: venues.location.distance,
        lat: venues.location.lat,
        long: venues.location.lng,
        categoryId: venues.categories[0].id,
        categoryShortName: venues.categories[0].shortName,
        price: Math.ceil(Math.random() * 4), //venueDetails.response.venue.price.tier //TODO: Use this for actual data.
        rating: Number((Math.random() * 10).toFixed(1)) //venueDetails.response.venue.rating, //TODO: Use this for actual data.
        //menu: menuItems
      };
    });
    const data = await Promise.all(dataPromises);
    return data.sort(function(a, b) {
      //sort by distance from closest to farthest
      return a.distance - b.distance;
    });
  } catch (error) {
    console.error(error);
  }
};

// //TEST of getting all venues
(async () => {
  console.log(
    JSON.stringify(
      await getAllVenues(morganLatLong, DRIVE, FOOD_GENERAL, 50),
      null,
      2
    )
  );
})();

// // TEST of getting a venue
// (async () => {
//   console.log(
//     JSON.stringify(await getAVenuesDetails(MEXICAN_RESTAURANT), null, 2)
//   );
// })();

// //TEST of getting a venue menu
// (async () => {
//   console.log(JSON.stringify(await getAVenueMenu(MEXICAN_RESTAURANT), null, 2));
// })();

// console.log(
//   JSON.stringify(
//     sampleMenuDetails.response.menu.menus.items[0].entries.items
//       .map(section => section.entries.items[0])
//       .map(menuItem => {
//         return {
//           name: menuItem.name,
//           description: menuItem.description,
//           price: menuItem.price
//         };
//       })
//       .sort((a, b) => b.price - a.price)
//       .slice(0, 3),
//     null,
//     2
//   )
// );
