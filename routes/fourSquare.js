//Import Secrets
const fourSquare = require('../secrets').fourSquareConfig;
//Import Libraries
const axios = require('axios');

//Foursquare Metadata
const CLIENT_ID = fourSquare.clientId;
const CLIENT_SECRET = fourSquare.clientSecret;
const VERSION_NUMBER = fourSquare.versionNumber;

//Sample LatLongs (for testing)
const slcLatLong = '40.7630,-111.9011';
const laJollaLatLong = '32.8328,-117.2713';

//Sample Restaurant IDs (for testing)
const THAI_RESTAURANT = '4f3222d719836c91c7b9a86e';

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

//GET all venues, returns array of venues with details sorted by distance from lat, long
let getAllVenues = async (latLong, radius, categoryId, limit = 20) => {
  try {
    return await axios.get(
      `https://api.foursquare.com/v2/venues/search?ll=${latLong}&radius=${radius}&limit=${limit}&categoryId=${categoryId}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`
    );
  } catch (error) {
    console.error(error);
  }
};

//GET a venue's details, used to return rating and tier
let getAVenuesDetails = async venueId => {
  try {
    return await axios.get(
      `https://api.foursquare.com/v2/venues/${venueId}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`
    );
  } catch (error) {
    console.error(error);
  }
};

const sampleGetAllVenues = getAllVenues(slcLatLong, BIKE, THAI).then(values =>
  values.data.response.venues
    .map(venues => ({
      restaurantId: venues.id,
      name: venues.name,
      distance: venues.location.distance,
      lat: venues.location.lat,
      long: venues.location.lng,
      categoryId: venues.categories[0].id,
      categoryShortName: venues.categories[0].shortName
      // ,
      // price: getAVenuesDetails(venues.id)
      //   .then(venue => venue.data.response.venue.price)
      //   .catch(error => console.error(error)),
      // rating: getAVenuesDetails(venues.id)
      //   .then(venue => venue.data.response.venue.rating)
      //   .catch(error => console.error(error))
    }))
    .sort(function(a, b) {
      //sort by distance
      return a.distance - b.distance;
    })
);

const sampleGetAVenue = getAVenuesDetails(THAI_RESTAURANT).then(
  values => values.data.response
);

//TEST of getting all venues
// sampleGetAllVenues.then(val => console.log(val));

//TEST of getting a venue's details

sampleGetAVenue.then(val => console.log(val));
