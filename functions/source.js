const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.upperCase = functions.https.onRequest((req, res) => {
  res.send('json');
});

exports.returnVenues = functions.https.onRequest(async (req, res) => {
  //Import Libraries
  const axios = require('axios');
  const flatten = require('lodash.flatten');

  //Foursquare Metadata
  const CLIENT_ID = functions.config().foursquare.clientid;
  const CLIENT_SECRET = functions.config().foursquare.clientsecret;
  const VERSION_NUMBER = functions.config().foursquare.versionnumber;

  //Sample LatLongs (for testing)
  const adilLatLong = '40.7630,-111.9011';
  const johnLatLong = '43.0650,-89.3910';
  const morganLatLong = '41.8083,-72.9195';

  //Sample Restaurant IDs (for testing)
  const MEXICAN_RESTAURANT = '4adf49fff964a5201f7921e3';
  const PUB_RESTAURANT = '4ae7198ef964a52067a821e3';

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

  //Helper Function
  const waitASec = () => {
    return new Promise((res, reject) => {
      setTimeout(() => {
        res(null);
      }, 1000);
    });
  };

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
      return null;
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
            };
          })
          .sort((a, b) => b.price - a.price)
          .slice(0, 5); // only send back the top three
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

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
      );
      const dataPromises = response.data.response.venues.map(async venues => {
        const venueDetails = await getAVenuesDetails(venues.id);
        await waitASec();
        const menuItems = await getAVenueMenu(venues.id);
        await waitASec();
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
          menu: menuItems || false,
        };
      });
      const data = await Promise.all(dataPromises);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const rateVenues = (venues, userData) => {
    const calculateCategoryWeighted = (venue, userData) => {
      if (userData.categories[venue.categoryId]) {
        const preferredOutOfTen = userData.categories[venue.categoryId] * 10;
        const weightedTotal = preferredOutOfTen * userData.weights.categories;
        return weightedTotal;
      } else {
        return 0;
      }
    };
    const calculatePriceWeighted = (venue, userData) => {
      const venuePriceOutOfTen = 10 - venue.price.tier * 2.5;
      const preferredPriceOutOfTen = 10 - userData.priceTier * 2.5;
      const difference = Math.abs(venuePriceOutOfTen - preferredPriceOutOfTen);
      const differenceOutOfTen = 10 - difference;
      const weightedTotal = differenceOutOfTen * userData.weights.priceRange;
      return weightedTotal || 0;
    };
    const calculateRangeWeighted = (venue, userData, searchRange) => {
      const tensInt = 10 / searchRange;
      const rangeOutOfTen = 10 - venue.distance * tensInt;
      const weightedTotal = Math.ceil(rangeOutOfTen) * userData.weights.range;
      return weightedTotal || 0;
    };
    const calculateRatingWeighted = (venue, userData) => {
      const difference = Math.abs(venue.rating - userData.rating);
      const differenceOutOfTen = 10 - difference;
      const weightedTotal = differenceOutOfTen * userData.weights.rating;
      return weightedTotal;
    };
    const calculateSavor = (venue, userData) => {
      const categoryScore = calculateCategoryWeighted(venue, userData);
      const priceScore = calculatePriceWeighted(venue, userData);
      const rangeScore = calculateRangeWeighted(venue, userData, 12000);
      const ratingScore = calculateRatingWeighted(venue, userData);
      const savorScore = (
        categoryScore +
        priceScore +
        rangeScore +
        ratingScore
      ).toFixed(2);
      return savorScore;
    };
    const addScore = (venues, userData) => {
      const keyedVenues = [];
      venues.forEach(venue => {
        const venueWithScore = venue;
        venueWithScore.savorScore = calculateSavor(venue, userData);
        keyedVenues.push(venueWithScore);
      });
      return keyedVenues.sort((a, b) => b.savorScore - a.savorScore);
    };
    return addScore(venues, userData);
  };
  //TEST of getting all venues

  console.log('-----------------------------------');
  console.log('req.query');
  console.log(req.query);
  console.log('-----------------------------------');

  const johnVenues = await getAllVenues(
    `${req.query.lat},${req.query.long}`,
    DRIVE,
    FOOD_GENERAL,
    1
  );

  console.log('-----------------------------------');
  console.log('John Venues');
  console.log(johnVenues);
  console.log('-----------------------------------');

  const ratedVenues = rateVenues(johnVenues, {
    weights: {
      categories: 0.1,
      priceRange: 0.4,
      rating: 0.3,
      range: 0.2,
    },
    categories: {
      '4bf58dd8d48988d1d2941735': 0.5,
      '4bf58dd8d48988d1e0931735': 0.5,
      '4bf58dd8d48988d1ca941735': 0.5,
    },
    priceTier: 2,
    rating: 2,
    distance: 5000,
  });
  console.log('-----------------------------------');
  console.log('Rated Venues');
  console.log(ratedVenues);
  console.log('-----------------------------------');
  res.send(ratedVenues);
});

/*============== DUMMY DATA ==============*/
const johnDummyData = [
  {
    restaurantId: '526da0ee498e60aad4db9623',
    name: 'Bassett Street Brunch Club',
    distance: 847,
    lat: 43.07237001751198,
    long: -89.39359962541867,
    categoryId: '4bf58dd8d48988d143941735',
    categoryShortName: 'Breakfast',
    price: 2,
    rating: 4.8,
  },
  {
    restaurantId: '4ad43881f964a52075e720e3',
    name: 'Nitty Gritty Restaurant & Bar',
    distance: 855,
    lat: 43.071879363581864,
    long: -89.39568670715576,
    categoryId: '4bf58dd8d48988d116941735',
    categoryShortName: 'Bar',
    price: 2,
    rating: 4.8,
  },
  {
    restaurantId: '57c8d188498e5242e4887d42',
    name: 'Red Sushi',
    distance: 872,
    lat: 43.072425463011655,
    long: -89.38757218434793,
    categoryId: '4bf58dd8d48988d1d2941735',
    categoryShortName: 'Sushi',
    price: 1,
    rating: 2.8,
  },
  {
    restaurantId: '4abe946ef964a520988e20e3',
    name: "Paisan's",
    distance: 903,
    lat: 43.0709316403858,
    long: -89.38340842638942,
    categoryId: '4bf58dd8d48988d110941735',
    categoryShortName: 'Italian',
    price: 1,
    rating: 8.9,
  },
  {
    restaurantId: '4b0ae619f964a520ab2923e3',
    name: 'Vintage Spirits & Grill',
    distance: 968,
    lat: 43.073035,
    long: -89.39557492733002,
    categoryId: '4bf58dd8d48988d116941735',
    categoryShortName: 'Bar',
    price: 4,
    rating: 7.7,
  },
  {
    restaurantId: '4aea28ebf964a520deb921e3',
    name: "Dotty Dumpling's Dowry",
    distance: 973,
    lat: 43.07298458901576,
    long: -89.39588621087248,
    categoryId: '4bf58dd8d48988d16c941735',
    categoryShortName: 'Burgers',
    price: 4,
    rating: 8.4,
  },
  {
    restaurantId: '4b4d1adff964a52024cb26e3',
    name: 'Tornado Room Steakhouse',
    distance: 986,
    lat: 43.072508,
    long: -89.384554,
    categoryId: '4bf58dd8d48988d1cc941735',
    categoryShortName: 'Steakhouse',
    price: 1,
    rating: 4.2,
  },
  {
    restaurantId: '5328b267498e0f88beb0c5bb',
    name: 'Short Stack Eatery',
    distance: 1078,
    lat: 43.07466,
    long: -89.389984,
    categoryId: '4bf58dd8d48988d143941735',
    categoryShortName: 'Breakfast',
    price: 2,
    rating: 5.8,
  },
  {
    restaurantId: '51bcae0d498e456099a2f8f0',
    name: "Paul's Pel'meni",
    distance: 1086,
    lat: 43.074497,
    long: -89.39406,
    categoryId: '52e928d0bcbc57f1066b7e9c',
    categoryShortName: 'Pelmeni',
    price: 1,
    rating: 3.4,
  },
  {
    restaurantId: '4b8875f0f964a5208af931e3',
    name: 'Tutto Pasta Trattoria',
    distance: 1086,
    lat: 43.07474132671294,
    long: -89.3902336227655,
    categoryId: '4bf58dd8d48988d110941735',
    categoryShortName: 'Italian',
    price: 1,
    rating: 7.7,
  },
  {
    restaurantId: '4b80b6d3f964a520dc8730e3',
    name: 'Chocolate Shoppe Ice Cream',
    distance: 1113,
    lat: 43.0748881730575,
    long: -89.39310237265538,
    categoryId: '4bf58dd8d48988d1c9941735',
    categoryShortName: 'Ice Cream',
    price: 2,
    rating: 8.6,
  },
  {
    restaurantId: '5596dacf498ef8cc220fb07f',
    name: 'Hopcat',
    distance: 1121,
    lat: 43.075062115179996,
    long: -89.39157820920616,
    categoryId: '4bf58dd8d48988d11b941735',
    categoryShortName: 'Pub',
    price: 3,
    rating: 2.9,
  },
  {
    restaurantId: '4b886492f964a5208df431e3',
    name: "Myles' Teddywedgers Cornish Pasty",
    distance: 1138,
    lat: 43.074717425613585,
    long: -89.38665398126882,
    categoryId: '4bf58dd8d48988d1c4941735',
    categoryShortName: 'Restaurant',
    price: 3,
    rating: 6.9,
  },
  {
    restaurantId: '55c17479498ec2a4ccb2a112',
    name: 'Colectivo Coffee',
    distance: 1147,
    lat: 43.074743679226295,
    long: -89.39562416312101,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 4,
    rating: 2.5,
  },
  {
    restaurantId: '4b4f582ff964a520420227e3',
    name: "McDonald's",
    distance: 1149,
    lat: 43.06801777542838,
    long: -89.4045227766037,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: 3,
    rating: 5,
  },
  {
    restaurantId: '4b3a7807f964a520116825e3',
    name: "Ian's Pizza on State",
    distance: 1150,
    lat: 43.074913,
    long: -89.386999,
    categoryId: '4bf58dd8d48988d1ca941735',
    categoryShortName: 'Pizza',
    price: 3,
    rating: 1.6,
  },
  {
    restaurantId: '4bedc694e24d20a1aff97114',
    name: 'State Street Brats',
    distance: 1160,
    lat: 43.07479716851709,
    long: -89.39586192369461,
    categoryId: '4bf58dd8d48988d116941735',
    categoryShortName: 'Bar',
    price: 2,
    rating: 7.6,
  },
  {
    restaurantId: '598e2574c0f1632f70012773',
    name: 'Belair Cantina Madison',
    distance: 1169,
    lat: 43.0736673255023,
    long: -89.3828759322076,
    categoryId: '4bf58dd8d48988d116941735',
    categoryShortName: 'Bar',
    price: 3,
    rating: 5.3,
  },
  {
    restaurantId: '4b665819f964a5209f1e2be3',
    name: 'Starbucks',
    distance: 1196,
    lat: 43.07389817,
    long: -89.38273627,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 1,
    rating: 6.4,
  },
  {
    restaurantId: '4afe0a09f964a5204e2d22e3',
    name: 'Chipotle Mexican Grill',
    distance: 1198,
    lat: 43.07495691256683,
    long: -89.3966121152414,
    categoryId: '4bf58dd8d48988d1c1941735',
    categoryShortName: 'Mexican',
    price: 4,
    rating: 5.1,
  },
  {
    restaurantId: '5081a3b2d63e3e73d4338d30',
    name: 'University Book Store Coffee Cart',
    distance: 1224,
    lat: 43.0748912126272,
    long: -89.39759731292725,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 4,
    rating: 6.1,
  },
  {
    restaurantId: '59c724362e268063d7dcb25d',
    name: 'Trippalindee',
    distance: 1231,
    lat: 43.075542,
    long: -89.39561,
    categoryId: '4bf58dd8d48988d14e941735',
    categoryShortName: 'American',
    price: 2,
    rating: 6,
  },
  {
    restaurantId: '4d099430e6f83704c1885b87',
    name: 'Merchant',
    distance: 1302,
    lat: 43.07414664263371,
    long: -89.38100937738655,
    categoryId: '4bf58dd8d48988d157941735',
    categoryShortName: 'New American',
    price: 1,
    rating: 7.9,
  },
  {
    restaurantId: '4c24b64bb012b713988a0893',
    name: 'Graze',
    distance: 1303,
    lat: 43.07484887182121,
    long: -89.38232575948915,
    categoryId: '4bf58dd8d48988d155941735',
    categoryShortName: 'Gastropub',
    price: 1,
    rating: 5.2,
  },
  {
    restaurantId: '515ddf3de4b068af64c1468c',
    name: 'Colectivo Coffee',
    distance: 1324,
    lat: 43.074884,
    long: -89.381937,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 4,
    rating: 6.7,
  },
  {
    restaurantId: '4d686a320a25b60c55821790',
    name: 'Great Dane Pub & Brewing Company',
    distance: 1381,
    lat: 43.07468710955784,
    long: -89.3803908048707,
    categoryId: '50327c8591d4c4b30a586d5d',
    categoryShortName: 'Brewery',
    price: 3,
    rating: 9.9,
  },
  {
    restaurantId: '4afcc582f964a520bc2522e3',
    name: 'The Old Fashioned Tavern & Restaurant',
    distance: 1382,
    lat: 43.076153,
    long: -89.383526,
    categoryId: '4bf58dd8d48988d155941735',
    categoryShortName: 'Gastropub',
    price: 3,
    rating: 7.6,
  },
  {
    restaurantId: '4bf80ce58d30d13aa9fcff17',
    name: 'The Daily Scoop @ Memorial Union',
    distance: 1399,
    lat: 43.07602518746117,
    long: -89.39925902287482,
    categoryId: '4bf58dd8d48988d1c9941735',
    categoryShortName: 'Ice Cream',
    price: 1,
    rating: 3.5,
  },
  {
    restaurantId: '4b9a5622f964a5201fad35e3',
    name: 'Peet’s Coffee & Tea',
    distance: 1431,
    lat: 43.07620116893806,
    long: -89.39963658182754,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 2,
    rating: 7.1,
  },
  {
    restaurantId: '41326e00f964a52086151fe3',
    name: "Jordan's Big Ten Pub",
    distance: 1440,
    lat: 43.0679986248754,
    long: -89.40823413195719,
    categoryId: '4bf58dd8d48988d116941735',
    categoryShortName: 'Bar',
    price: 3,
    rating: 0.3,
  },
  {
    restaurantId: '5914f620c4df1d6ddc02a361',
    name: 'Eno Vino',
    distance: 1454,
    lat: 43.07635687443169,
    long: -89.38215837951033,
    categoryId: '4bf58dd8d48988d123941735',
    categoryShortName: 'Wine Bar',
    price: 3,
    rating: 5,
  },
  {
    restaurantId: '4afc6d0bf964a5208b2222e3',
    name: "Bradbury's Coffee",
    distance: 1491,
    lat: 43.077391809117046,
    long: -89.3840246635214,
    categoryId: '4bf58dd8d48988d16d941735',
    categoryShortName: 'Café',
    price: 3,
    rating: 6.2,
  },
  {
    restaurantId: '4b5b3d96f964a5208ded28e3',
    name: "Culver's",
    distance: 3772,
    lat: 43.03603024800349,
    long: -89.41506326570321,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: 2,
    rating: 6.3,
  },
  {
    restaurantId: '52869069498e3289da675b02',
    name: 'Starbucks',
    distance: 4980,
    lat: 43.055718033590246,
    long: -89.45089797472531,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 4,
    rating: 3.2,
  },
  {
    restaurantId: '4af9aac2f964a5201f1322e3',
    name: 'Great Dane Pub & Brewing Company',
    distance: 5025,
    lat: 43.071148699580355,
    long: -89.45221552063161,
    categoryId: '50327c8591d4c4b30a586d5d',
    categoryShortName: 'Brewery',
    price: 4,
    rating: 1.9,
  },
  {
    restaurantId: '4adb8bb0f964a520da2821e3',
    name: 'Starbucks',
    distance: 5032,
    lat: 43.075233,
    long: -89.45128,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 2,
    rating: 9.5,
  },
  {
    restaurantId: '56218518498ed6af88a19b46',
    name: 'Café Hollander',
    distance: 5184,
    lat: 43.07320209335286,
    long: -89.45375822123673,
    categoryId: '4bf58dd8d48988d155941735',
    categoryShortName: 'Gastropub',
    price: 3,
    rating: 2.9,
  },
  {
    restaurantId: '4bbf538e30c99c743ef75411',
    name: 'Starbucks',
    distance: 6264,
    lat: 43.01610851,
    long: -89.429133,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 4,
    rating: 7.8,
  },
  {
    restaurantId: '4e4fb3f6091a58b848442bee',
    name: "McDonald's",
    distance: 9048,
    lat: 43.05710840173577,
    long: -89.50173155288212,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: 2,
    rating: 6,
  },
  {
    restaurantId: '4b743e7df964a5207fcf2de3',
    name: 'Starbucks',
    distance: 9081,
    lat: 43.05893389,
    long: -89.50234572,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 1,
    rating: 1.1,
  },
  {
    restaurantId: '54806dfb498e67f98a869485',
    name: 'Chick-fil-A',
    distance: 9175,
    lat: 43.058116,
    long: -89.503426,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: 1,
    rating: 3.8,
  },
  {
    restaurantId: '4ecc30f9775b4671dc78ebc7',
    name: 'Starbucks',
    distance: 9275,
    lat: 43.125614,
    long: -89.31271,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 2,
    rating: 3.8,
  },
  {
    restaurantId: '57e26771498e2f5ee471ba71',
    name: 'Chick-fil-A',
    distance: 9372,
    lat: 43.1262390281282,
    long: -89.31188037947008,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: 4,
    rating: 7.5,
  },
  {
    restaurantId: '5ac6b2c560255e1c760e8020',
    name: "Dave & Buster's",
    distance: 9389,
    lat: 43.055190419289765,
    long: -89.50565557356447,
    categoryId: '4bf58dd8d48988d1e1931735',
    categoryShortName: 'Arcade',
    price: 3,
    rating: 2.3,
  },
  {
    restaurantId: '56f03d38498eb3c16b03e9c2',
    name: "Culver's",
    distance: 9430,
    lat: 43.06103350978347,
    long: -89.50682739776911,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: 4,
    rating: 4.4,
  },
  {
    restaurantId: '4b74b527f964a52099ed2de3',
    name: 'The Green Lantern',
    distance: 9670,
    lat: 43.01335673488695,
    long: -89.29542998326903,
    categoryId: '4bf58dd8d48988d14e941735',
    categoryShortName: 'American',
    price: 2,
    rating: 5,
  },
  {
    restaurantId: '4ac23095f964a520229820e3',
    name: 'Panera Bread',
    distance: 10372,
    lat: 43.131264,
    long: -89.301283,
    categoryId: '4bf58dd8d48988d16a941735',
    categoryShortName: 'Bakery',
    price: 3,
    rating: 2,
  },
  {
    restaurantId: '59d3e5a0345cbe2f01dfa057',
    name: 'Longtable Beer Cafe',
    distance: 10461,
    lat: 43.09548380340694,
    long: -89.51271572387782,
    categoryId: '4bf58dd8d48988d1c4941735',
    categoryShortName: 'Restaurant',
    price: 2,
    rating: 6.6,
  },
  {
    restaurantId: '4adb5042f964a520ce2521e3',
    name: 'Starbucks',
    distance: 11192,
    lat: 43.090567,
    long: -89.524126,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: 1,
    rating: 5.1,
  },
  {
    restaurantId: '4bae4a8cf964a520469e3be3',
    name: "McDonald's",
    distance: 11266,
    lat: 43.090559928569064,
    long: -89.525066614151,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: 2,
    rating: 8.7,
  },
];
