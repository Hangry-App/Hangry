"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();
exports.returnVenues = functions.https.onRequest(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    // Import Libraries
    const axios = require('axios');

    const flatten = require('lodash.flatten'); // Foursquare Metadata


    const CLIENT_ID = functions.config().foursquare.clientid;
    const CLIENT_SECRET = functions.config().foursquare.clientsecret;
    const VERSION_NUMBER = functions.config().foursquare.versionnumber;

    const waitASec = () => {
      return new Promise((res, reject) => {
        setTimeout(() => {
          res(null);
        }, 1000);
      });
    }; // GET a venue's details, used to return rating and tier


    let getAVenuesDetails =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (venueId) {
        try {
          const response = yield axios.get(`https://api.foursquare.com/v2/venues/${venueId}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`);
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      return function getAVenuesDetails(_x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    let getAVenueMenu =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(function* (venueId) {
        try {
          const response = yield axios.get(`https://api.foursquare.com/v2/venues/${venueId}/menu?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`);
          const responseData = response.data.response.menu.menus;

          if (responseData.count > 0) {
            // check if there is a menu
            return flatten(responseData.items[0].entries.items.map(section => section.entries.items)).map(menuItem => {
              return {
                name: menuItem.name || false,
                description: menuItem.description || false,
                price: menuItem.price || false
              };
            }).sort((a, b) => b.price - a.price).slice(0, 5); // only send back the top three
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      return function getAVenueMenu(_x4) {
        return _ref3.apply(this, arguments);
      };
    }(); // GET all venues, returns array of venues with details sorted by distance from lat, long


    let getAllVenues =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(function* (latLong, radius, categoryId, limit = 10) {
        try {
          const response = yield axios.get(`https://api.foursquare.com/v2/venues/search`, {
            params: {
              ll: latLong,
              radius,
              limit,
              categoryId,
              client_id: CLIENT_ID,
              // eslint-disable-line camelcase
              client_secret: CLIENT_SECRET,
              // eslint-disable-line camelcase
              v: VERSION_NUMBER
            }
          });
          const getVenueDetailsPromises = response.data.response.venues.map(
          /*#__PURE__*/
          function () {
            var _ref5 = _asyncToGenerator(function* (venues) {
              const venueDetails = yield getAVenuesDetails(venues.id);
              yield waitASec();
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
                hasMenu: venueDetails.response.venue.hasMenu || false
              };
            });

            return function (_x8) {
              return _ref5.apply(this, arguments);
            };
          }());
          const allVenues = yield Promise.all(getVenueDetailsPromises);
          const allVenuesThatHaveMenus = allVenues.filter(venue => venue.hasMenu);
          const venuesWithMenusPromises = allVenuesThatHaveMenus.map(
          /*#__PURE__*/
          function () {
            var _ref6 = _asyncToGenerator(function* (venue) {
              const menuItems = yield getAVenueMenu(venue.restaurantId);
              yield waitASec();
              return _objectSpread({}, venue, {
                menu: menuItems
              });
            });

            return function (_x9) {
              return _ref6.apply(this, arguments);
            };
          }());
          const venuesWithMenus = yield Promise.all(venuesWithMenusPromises);
          return venuesWithMenus;
        } catch (error) {
          console.error(error);
        }
      });

      return function getAllVenues(_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }();

    const rateVenues = (venues, userData) => {
      const calculatePriceWeighted = (venue, userData) => {
        const venuePriceOutOfTen = 10 - venue.price.tier * 2.5;
        const preferredPriceOutOfTen = 10 - userData.priceTier * 2.5;
        const difference = Math.abs(venuePriceOutOfTen - preferredPriceOutOfTen);
        const differenceOutOfTen = 10 - difference;
        const weightedTotal = differenceOutOfTen * userData.weights.priceRange;
        return weightedTotal;
      };

      const calculateRangeWeighted = (venue, userData, searchRange) => {
        const tensInt = 10 / searchRange;
        const rangeOutOfTen = 10 - venue.distance * tensInt;
        const weightedTotal = Math.ceil(rangeOutOfTen) * userData.weights.range;
        return weightedTotal;
      };

      const calculateRatingWeighted = (venue, userData) => {
        const difference = Math.abs(venue.rating - userData.rating);
        const differenceOutOfTen = 10 - difference;
        const weightedTotal = differenceOutOfTen * userData.weights.rating;
        return weightedTotal;
      };

      const calculateSavor = (venue, userData) => {
        const priceScore = calculatePriceWeighted(venue, userData);
        const rangeScore = calculateRangeWeighted(venue, userData, userData.distance);
        const ratingScore = calculateRatingWeighted(venue, userData);
        const savorScore = Math.floor((priceScore + rangeScore + ratingScore) / (userData.weights.rating + userData.weights.priceRange + userData.weights.range));
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

    const usersVenues = yield getAllVenues(`${req.query.lat},${req.query.long}`, `${req.query.distance}`, `${req.query.listOfCategories}`, 10);
    const ratedVenues = rateVenues(usersVenues, {
      weights: {
        categories: req.query.categories,
        priceRange: req.query.priceTier,
        rating: req.query.rating,
        range: req.query.range
      },
      categories: {
        '4d4b7105d754a06374d81259': req.query['4d4b7105d754a06374d81259'] || 0.0,
        '4bf58dd8d48988d1ca941735': req.query['4bf58dd8d48988d1ca941735'] || 0.0,
        '4bf58dd8d48988d14e941735': req.query['4bf58dd8d48988d14e941735'] || 0.0,
        '4bf58dd8d48988d145941735': req.query['4bf58dd8d48988d145941735'] || 0.0,
        '4bf58dd8d48988d1d2941735': req.query['4bf58dd8d48988d1d2941735'] || 0.0,
        '4bf58dd8d48988d1c1941735': req.query['4bf58dd8d48988d1c1941735'] || 0.0,
        '4bf58dd8d48988d1bd941735': req.query['4bf58dd8d48988d1bd941735'] || 0.0,
        '4bf58dd8d48988d10f941735': req.query['4bf58dd8d48988d10f941735'] || 0.0,
        '4eb1bfa43b7b52c0e1adc2e8': req.query['4eb1bfa43b7b52c0e1adc2e8'] || 0.0,
        '4bf58dd8d48988d149941735': req.query['4bf58dd8d48988d149941735'] || 0.0
      },
      priceTier: req.query.priceTier,
      rating: req.query.ratingPref,
      distance: req.query.distance
    });
    console.log('-----------------------------------');
    console.log('Rated Venues');
    console.log(ratedVenues);
    console.log('-----------------------------------');
    res.send(ratedVenues);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
