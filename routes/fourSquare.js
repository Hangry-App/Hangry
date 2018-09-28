const fourSquare = require('../secrets').foursquare;
const axios = require('axios');

const adilLatLong = '40.7630,-111.9011';
const CLIENT_ID = fourSquare.clientId;
const CLIENT_SECRET = fourSquare.clientSecret;
const YYYYMMDD = '20180928';
const walkMeters = 100;
const bikeMeters = 1000;
const driveMeters = 10000;

const categoryId = '4d4b7105d754a06374d81259'; //food

let getVenues = async (latLong, radius, limit, categoryId) => {
  try {
    return await axios.get(
      `https://api.foursquare.com/v2/venues/search?ll=${latLong}&radius=${radius}&limit=${limit}&categoryId=${categoryId}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${YYYYMMDD}`
    );
  } catch (error) {
    console.error(error);
  }
};

let getVenuesDetails = async venueId => {
  try {
    return await axios.get(
      `https://api.foursquare.com/v2/venues/${venueId}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${YYYYMMDD}`
    );
  } catch (error) {
    console.error(error);
  }
};

// const awaitedVenues = async () => {
//   const venues = await getVenues(adilLatLong);
//   // console.log(JSON.stringify(venues.data.response.venues, null, 2));
//   return venues.data.response.venues;
// };

const sampleVenues = getVenues(adilLatLong, bikeMeters, 5, categoryId).then(
  values =>
    values.data.response.venues
      .map(venues => ({
        foodId: venues.id,
        name: venues.name,
        distance: venues.location.distance,
        lat: venues.location.lat,
        long: venues.location.lng,
        categoryId: venues.categories[0].id,
        categoryShortName: venues.categories[0].shortName,
        price: getVenuesDetails(venues.id)
          .then(venue => console.log(venue.data.response.venue.price))
          .catch(error => console.error(error)),
        rating: getVenuesDetails(venues.id)
          .then(venue => console.log(venue.data.response.venue.rating))
          .catch(error => console.error(error))
      }))
      .sort(function(a, b) {
        // console.log(
        //   'a: ',
        //   a.distance,
        //   '|',
        //   'b: ',
        //   b.distance,
        //   '|',
        //   'a-b:',
        //   a.distance - b.distance
        // );
        return a.distance - b.distance;
      })
);

sampleVenues.then(val => console.log(val));
