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

eval("const functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\")\nconst axios = __webpack_require__(/*! axios */ \"axios\");\nconst flatten = __webpack_require__(/*! lodash.flatten */ \"lodash.flatten\");\n\nconst CLIENT_ID = functions.config().foursquare.clientid;\nconst CLIENT_SECRET = functions.config().foursquare.clientsecret;\nconst VERSION_NUMBER = functions.config().foursquare.versionnumber;\n\nconst waitASec = () => {\n    return new Promise((res, reject) => {\n        setTimeout(() => {\n            res(null)\n        }, 1000)\n    })\n}\n\n//GET a venue's details, used to return rating and tier\nconst getAVenuesDetails = async venueId => {\n    try {\n        const response = await axios.get(\n            `https://api.foursquare.com/v2/venues/${venueId}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`\n        )\n        return response.data\n    } catch (error) {\n        console.error(error)\n        return null\n    }\n}\n\nconst getAVenueMenu = async venueId => {\n    try {\n        const response = await axios.get(\n            `https://api.foursquare.com/v2/venues/${venueId}/menu?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_NUMBER}`\n        )\n        const responseData = response.data.response.menu.menus\n        if (responseData.count > 0) {\n            //check if there is a menu\n            return flatten(\n                responseData.items[0].entries.items.map(\n                    section => section.entries.items\n                )\n            )\n                .map(menuItem => {\n                    return {\n                        name: menuItem.name || false,\n                        description: menuItem.description || false,\n                        price: menuItem.price || false,\n                    }\n                })\n                .sort((a, b) => b.price - a.price)\n                .slice(0, 5) // only send back the top three\n        } else {\n            return false\n        }\n    } catch (error) {\n        console.error(error)\n        return null\n    }\n}\n\n//GET all venues, returns array of venues with details sorted by distance from lat, long\nconst getAllVenues = async (latLong, radius, categoryId, limit = 10) => {\n    try {\n        const response = await axios.get(\n            `https://api.foursquare.com/v2/venues/search`,\n            {\n                params: {\n                    ll: latLong,\n                    radius,\n                    limit,\n                    categoryId,\n                    client_id: CLIENT_ID, //eslint-disable-line camelcase\n                    client_secret: CLIENT_SECRET, //eslint-disable-line camelcase\n                    v: VERSION_NUMBER,\n                },\n            }\n        )\n        const getVenueDetailsPromises = response.data.response.venues.map(\n            async venues => {\n                const venueDetails = await getAVenuesDetails(venues.id)\n                await waitASec()\n\n                return {\n                    restaurantId: venues.id,\n                    name: venues.name,\n                    distance: venues.location.distance,\n                    lat: venues.location.lat,\n                    long: venues.location.lng,\n                    categoryId: venues.categories[0].id,\n                    categoryShortName: venues.categories[0].shortName,\n                    price: venueDetails.response.venue.price || 0,\n                    rating: venueDetails.response.venue.rating || 0,\n                    phone: venueDetails.response.venue.contact.phone,\n                    hasMenu: venueDetails.response.venue.hasMenu || false,\n                }\n            }\n        )\n        const allVenues = await Promise.all(getVenueDetailsPromises)\n        const allVenuesThatHaveMenus = allVenues.filter(\n            venue => venue.hasMenu\n        )\n        const venuesWithMenusPromises = allVenuesThatHaveMenus.map(\n            async venue => {\n                const menuItems = await getAVenueMenu(venue.restaurantId)\n                await waitASec()\n                return {\n                    ...venue,\n                    menu: menuItems,\n                }\n            }\n        )\n        const venuesWithMenus = await Promise.all(venuesWithMenusPromises)\n        return venuesWithMenus\n    } catch (error) {\n        console.error(error)\n    }\n}\n\nmodule.exports = getAllVenues\n\n//# sourceURL=webpack:///./getVenues.js?");

/***/ }),

/***/ "./rateVenues.js":
/*!***********************!*\
  !*** ./rateVenues.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const calculatePriceWeighted = (venue, userData) => {\n    const venuePriceOutOfTen = 10 - venue.price.tier * 2.5\n    const preferredPriceOutOfTen = 10 - userData.priceTier * 2.5 \n    const difference = Math.abs(\n        venuePriceOutOfTen - preferredPriceOutOfTen\n    )\n    const differenceOutOfTen = 10 - difference\n    const weightedTotal = differenceOutOfTen * (userData.weights.priceRange * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10)) \n    return weightedTotal || 0\n}\nconst calculateRangeWeighted = (venue, userData, searchRange) => {\n    const tensInt = 10 / searchRange\n    const rangeOutOfTen = 10 - venue.distance * tensInt\n    const weightedTotal =  Math.ceil(rangeOutOfTen) * (userData.weights.range * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10))\n    return weightedTotal || 0\n} \nconst calculateRatingWeighted = (venue, userData) => {\n    const difference = Math.abs(venue.rating - userData.rating)\n    const differenceOutOfTen = 10 - difference\n    const weightedTotal = differenceOutOfTen * (userData.weights.rating * ((userData.weights.rating + userData.weights.priceRange + userData.weights.range + userData.weights.categories) / 10))\n    return weightedTotal\n}\nconst calculateSavor = (venue, userData, searchRange) => {\n    const priceScore = calculatePriceWeighted(venue, userData)\n    const rangeScore = calculateRangeWeighted(venue, userData, searchRange)\n    const ratingScore = calculateRatingWeighted(venue, userData)\n    const savorScore = (priceScore + rangeScore + ratingScore).toFixed(2)\n    return savorScore\n}\nconst rateVenues = (venues, userData, searchRange) => {\n    const keyedVenues = [];\n    venues.forEach(venue => {\n        const venueWithScore = venue;\n        venueWithScore.savorScore = calculateSavor(venues, userData, searchRange);\n        keyedVenues.push(venueWithScore);\n    })\n    return keyedVenues.sort((a, b) => b.savorScore - a.savorScore);\n}\n\nmodule.exports = rateVenues;\n\n//# sourceURL=webpack:///./rateVenues.js?");

/***/ }),

/***/ "./sourceRefactor.js":
/*!***************************!*\
  !*** ./sourceRefactor.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const functions = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\nconst admin = __webpack_require__(/*! firebase-admin */ \"firebase-admin\");\nconst getAllVenues = __webpack_require__(/*! ./getVenues */ \"./getVenues.js\");\nconst rateVenues = __webpack_require__(/*! ./rateVenues */ \"./rateVenues.js\");\nadmin.initializeApp();\n\nexports.returnVenues = functions.https.onRequest(async (req, res) => {\n    const foundVenues = await getAllVenues(\n        `${req.query.lat},${req.query.long}`,\n        `${req.query.distance}`,\n        `${req.query.listOfCategories}`,\n        10\n    )\n    console.log('--------------------------------');\n    console.log(foundVenues);\n    console.log('--------------------------------');\n    const ratedVenues = rateVenues(\n        foundVenues, {\n            weights: {\n                categories: req.query.categories,\n                priceRange: req.query.priceTier,\n                rating: req.query.rating,\n                range: req.query.range,\n            },\n            categories: {\n                '4d4b7105d754a06374d81259':\n                    req.query['4d4b7105d754a06374d81259'] || 0.0,\n                '4bf58dd8d48988d1ca941735':\n                    req.query['4bf58dd8d48988d1ca941735'] || 0.0,\n                '4bf58dd8d48988d14e941735':\n                    req.query['4bf58dd8d48988d14e941735'] || 0.0,\n                '4bf58dd8d48988d145941735':\n                    req.query['4bf58dd8d48988d145941735'] || 0.0,\n                '4bf58dd8d48988d1d2941735':\n                    req.query['4bf58dd8d48988d1d2941735'] || 0.0,\n                '4bf58dd8d48988d1c1941735':\n                    req.query['4bf58dd8d48988d1c1941735'] || 0.0,\n                '4bf58dd8d48988d1bd941735':\n                    req.query['4bf58dd8d48988d1bd941735'] || 0.0,\n                '4bf58dd8d48988d10f941735':\n                    req.query['4bf58dd8d48988d10f941735'] || 0.0,\n                '4eb1bfa43b7b52c0e1adc2e8':\n                    req.query['4eb1bfa43b7b52c0e1adc2e8'] || 0.0,\n                '4bf58dd8d48988d149941735':\n                    req.query['4bf58dd8d48988d149941735'] || 0.0,\n            },\n            priceTier: req.query.priceTier,\n            rating: req.query.ratingPref,\n            distance: req.query.distance,\n        }, req.query.distance\n    );\n    console.log('--------------------------------');\n    console.log(ratedVenues);\n    console.log('--------------------------------');\n    res.send(ratedVenues);\n})\n\n//# sourceURL=webpack:///./sourceRefactor.js?");

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