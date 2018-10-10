/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./getVenues.js":
/*!**********************!*\
  !*** ./getVenues.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nconst functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\n\nconst axios = __webpack_require__(/*! axios */ \"axios\");\n\nconst flatten = __webpack_require__(/*! lodash.flatten */ \"lodash.flatten\");\n\nconst CLIENT_ID = functions.config().foursquare.clientid;\nconst CLIENT_SECRET = functions.config().foursquare.clientsecret;\nconst VERSION_NUMBER = functions.config().foursquare.versionnumber;\n\nconst waitASec = () => {\n  return new Promise((res, reject) => {\n    setTimeout(() => {\n      res(null);\n    }, 1000);\n  });\n}; //GET a venue's details, used to return rating and tier\n\n\nconst getAVenuesDetails =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(function* (venueId) {\n    try {\n      const response = yield axios.get(`https://api.foursquare.com/v2/venues/${venueId}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`);\n      return response.data;\n    } catch (error) {\n      console.error(error);\n      return null;\n    }\n  });\n\n  return function getAVenuesDetails(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nconst getAVenueMenu =\n/*#__PURE__*/\nfunction () {\n  var _ref2 = _asyncToGenerator(function* (venueId) {\n    try {\n      const response = yield axios.get(`https://api.foursquare.com/v2/venues/${venueId}/menu?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`);\n      const responseData = response.data.response.menu.menus;\n\n      if (responseData.count > 0) {\n        //check if there is a menu\n        return flatten(responseData.items[0].entries.items.map(section => section.entries.items)).map(menuItem => {\n          return {\n            name: menuItem.name || false,\n            description: menuItem.description || false,\n            price: menuItem.price || false\n          };\n        }).sort((a, b) => b.price - a.price).slice(0, 5); // only send back the top three\n      } else {\n        return false;\n      }\n    } catch (error) {\n      console.error(error);\n      return null;\n    }\n  });\n\n  return function getAVenueMenu(_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}(); //GET all venues, returns array of venues with details sorted by distance from lat, long\n\n\nconst getAllVenues =\n/*#__PURE__*/\nfunction () {\n  var _ref3 = _asyncToGenerator(function* (latLong, radius, categoryId, limit = 10) {\n    try {\n      const response = yield axios.get(`https://api.foursquare.com/v2/venues/search`, {\n        params: {\n          ll: latLong,\n          radius,\n          limit,\n          categoryId,\n          client_id: CLIENT_ID,\n          //eslint-disable-line camelcase\n          client_secret: CLIENT_SECRET,\n          //eslint-disable-line camelcase\n          v: VERSION_NUMBER\n        }\n      });\n      const getVenueDetailsPromises = response.data.response.venues.map(\n      /*#__PURE__*/\n      function () {\n        var _ref4 = _asyncToGenerator(function* (venues) {\n          const venueDetails = yield getAVenuesDetails(venues.id);\n          yield waitASec();\n          return {\n            restaurantId: venues.id,\n            name: venues.name,\n            distance: venues.location.distance,\n            lat: venues.location.lat,\n            long: venues.location.lng,\n            categoryId: venues.categories[0].id,\n            categoryShortName: venues.categories[0].shortName,\n            price: venueDetails.response.venue.price || 0,\n            rating: venueDetails.response.venue.rating || 0,\n            phone: venueDetails.response.venue.contact.phone,\n            hasMenu: venueDetails.response.venue.hasMenu || false\n          };\n        });\n\n        return function (_x6) {\n          return _ref4.apply(this, arguments);\n        };\n      }());\n      const allVenues = yield Promise.all(getVenueDetailsPromises);\n      const allVenuesThatHaveMenus = allVenues.filter(venue => venue.hasMenu);\n      const venuesWithMenusPromises = allVenuesThatHaveMenus.map(\n      /*#__PURE__*/\n      function () {\n        var _ref5 = _asyncToGenerator(function* (venue) {\n          const menuItems = yield getAVenueMenu(venue.restaurantId);\n          yield waitASec();\n          return _objectSpread({}, venue, {\n            menu: menuItems\n          });\n        });\n\n        return function (_x7) {\n          return _ref5.apply(this, arguments);\n        };\n      }());\n      const venuesWithMenus = yield Promise.all(venuesWithMenusPromises);\n      return venuesWithMenus;\n    } catch (error) {\n      console.error(error);\n    }\n  });\n\n  return function getAllVenues(_x3, _x4, _x5) {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\nmodule.exports = getAllVenues;\n\n//# sourceURL=webpack:///./getVenues.js?");

/***/ }),

/***/ "./rateVenues.js":
/*!***********************!*\
  !*** ./rateVenues.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const calculatePriceWeighted = (venue, userData) => {\n  const venuePriceOutOfTen = 10 - venue.price.tier * 2.5;\n  const preferredPriceOutOfTen = 10 - userData.priceTier * 2.5;\n  const difference = Math.abs(venuePriceOutOfTen - preferredPriceOutOfTen);\n  const differenceOutOfTen = 10 - difference;\n  const weightedTotal = differenceOutOfTen * (userData.weights.priceRange * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10));\n  return weightedTotal || 0;\n};\n\nconst calculateRangeWeighted = (venue, userData, searchRange) => {\n  const tensInt = 10 / searchRange;\n  const rangeOutOfTen = 10 - venue.distance * tensInt;\n  const weightedTotal = Math.ceil(rangeOutOfTen) * (userData.weights.range * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10));\n  return weightedTotal || 0;\n};\n\nconst calculateRatingWeighted = (venue, userData) => {\n  const difference = Math.abs(venue.rating - userData.rating);\n  const differenceOutOfTen = 10 - difference;\n  const weightedTotal = differenceOutOfTen * (userData.weights.rating * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10));\n  return weightedTotal;\n};\n\nconst calculateSavor = (venue, userData, searchRange) => {\n  const priceScore = calculatePriceWeighted(venue, userData);\n  const rangeScore = calculateRangeWeighted(venue, userData, searchRange);\n  const ratingScore = calculateRatingWeighted(venue, userData);\n  const savorScore = (priceScore + rangeScore + ratingScore).toFixed(2);\n  return savorScore;\n};\n\nconst rateVenues = (venues, userData, searchRange) => {\n  const keyedVenues = [];\n  venues.forEach(venue => {\n    const venueWithScore = venue;\n    venueWithScore.savorScore = calculateSavor(venues, userData, searchRange);\n    keyedVenues.push(venueWithScore);\n  });\n  return keyedVenues.sort((a, b) => b.savorScore - a.savorScore);\n};\n\nmodule.exports = rateVenues;\n\n//# sourceURL=webpack:///./rateVenues.js?");

/***/ }),

/***/ "./sourceRefactor.js":
/*!***************************!*\
  !*** ./sourceRefactor.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nconst functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\n\nconst admin = __webpack_require__(/*! firebase-admin */ \"firebase-admin\");\n\nconst getAllVenues = __webpack_require__(/*! ./getVenues */ \"./getVenues.js\");\n\nconst rateVenues = __webpack_require__(/*! ./rateVenues */ \"./rateVenues.js\");\n\nadmin.initializeApp();\nexports.returnVenues = functions.https.onRequest(\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(function* (req, res) {\n    const foundVenues = yield getAllVenues(`${req.query.lat},${req.query.long}`, `${req.query.distance}`, `${req.query.listOfCategories}`, 10);\n    console.log('--------------------------------');\n    console.log(foundVenues);\n    console.log('--------------------------------');\n    const ratedVenues = rateVenues(foundVenues, {\n      weights: {\n        categories: req.query.categories,\n        priceRange: req.query.priceTier,\n        rating: req.query.rating,\n        range: req.query.range\n      },\n      categories: {\n        '4d4b7105d754a06374d81259': req.query['4d4b7105d754a06374d81259'] || 0.0,\n        '4bf58dd8d48988d1ca941735': req.query['4bf58dd8d48988d1ca941735'] || 0.0,\n        '4bf58dd8d48988d14e941735': req.query['4bf58dd8d48988d14e941735'] || 0.0,\n        '4bf58dd8d48988d145941735': req.query['4bf58dd8d48988d145941735'] || 0.0,\n        '4bf58dd8d48988d1d2941735': req.query['4bf58dd8d48988d1d2941735'] || 0.0,\n        '4bf58dd8d48988d1c1941735': req.query['4bf58dd8d48988d1c1941735'] || 0.0,\n        '4bf58dd8d48988d1bd941735': req.query['4bf58dd8d48988d1bd941735'] || 0.0,\n        '4bf58dd8d48988d10f941735': req.query['4bf58dd8d48988d10f941735'] || 0.0,\n        '4eb1bfa43b7b52c0e1adc2e8': req.query['4eb1bfa43b7b52c0e1adc2e8'] || 0.0,\n        '4bf58dd8d48988d149941735': req.query['4bf58dd8d48988d149941735'] || 0.0\n      },\n      priceTier: req.query.priceTier,\n      rating: req.query.ratingPref,\n      distance: req.query.distance\n    }, req.query.distance);\n    console.log('--------------------------------');\n    console.log(ratedVenues);\n    console.log('--------------------------------');\n    res.send(ratedVenues);\n  });\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\n\n//# sourceURL=webpack:///./sourceRefactor.js?");

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi @babel/polyfill ./sourceRefactor.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @babel/polyfill */\"@babel/polyfill\");\nmodule.exports = __webpack_require__(/*! ./sourceRefactor.js */\"./sourceRefactor.js\");\n\n\n//# sourceURL=webpack:///multi_@babel/polyfill_./sourceRefactor.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase-admin\");\n\n//# sourceURL=webpack:///external_%22firebase-admin%22?");

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase-functions\");\n\n//# sourceURL=webpack:///external_%22firebase-functions%22?");

/***/ }),

/***/ "lodash.flatten":
/*!*********************************!*\
  !*** external "lodash.flatten" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash.flatten\");\n\n//# sourceURL=webpack:///external_%22lodash.flatten%22?");

/***/ })

/******/ });