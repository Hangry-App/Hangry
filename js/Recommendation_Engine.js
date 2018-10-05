const dummyData = [
  {
    restaurantId: '4b463a75f964a520bf1a26e3',
    name: 'LaSalle Market and Deli',
    distance: 379,
    lat: 41.81061273935046,
    long: -72.92285654813413,
    categoryId: '4bf58dd8d48988d146941735',
    categoryShortName: 'Deli / Bodega',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 8.4,
    phone: '8606938010',
    menu: [
      {
        name: 'Ming Chicken Salad',
        description: false,
        price: '8.95'
      },
      {
        name: 'Spinach & Grilled Salmon Salad',
        description: false,
        price: '8.95'
      },
      {
        name: 'Portabella Sandwich',
        description:
          'Marinated portabellas, grilled onions, grilled red peppers with melted provolone on a grilled french stick',
        price: '8.50'
      },
      {
        name: 'Fajita',
        description:
          'Marinated & grilled flank or chicken, red and green bell peppers, onions, cheddar, lettuce and tomato',
        price: '8.50'
      },
      {
        name: 'Teriyaki Wrap',
        description:
          'Chicken, flank or grilled salmon, teriyaki sauce, broccoli with sesame oil, red pepper flakes & jasmine rice',
        price: '8.50'
      }
    ]
  },
  {
    restaurantId: '55a5421a498e48e87c7f5640',
    name: 'Giv Coffee',
    distance: 2699,
    lat: 41.825408788961504,
    long: -72.89644322182761,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 8,
    menu: false
  },
  {
    restaurantId: '4c4dc1469932e21ea2bcb6cc',
    name: "Dunkin' Donuts",
    distance: 4288,
    lat: 41.81717997723441,
    long: -72.86920518372492,
    categoryId: '4bf58dd8d48988d148941735',
    categoryShortName: 'Donuts',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 5.9,
    phone: '8606510703',
    menu: false
  },
  {
    restaurantId: '4c82c7fdd34ca1435ace2f80',
    name: "McDonald's",
    distance: 4370,
    lat: 41.81792091357868,
    long: -72.8684269824405,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 5.6,
    phone: '8606519589',
    menu: [
      {
        name: 'Hot Caramel Sundae',
        description:
          'Cool and creamy vanilla soft serve meets warm, rich, buttery caramel. *Nuts optional',
        price: false
      },
      {
        name: 'Big Mac®',
        description:
          'Mouthwatering perfection starts with two sear-sizzled 100% pure beef patties and Big Mac® sauce, sandwiched between a sesame seed bun. American cheese, shredded lettuce, onions and pickles top it off.',
        price: false
      },
      {
        name: 'Double Cheeseburger',
        description:
          'Double Cheeseburger features two 100% pure beef patties with absolutely no fillers, additives or preservatives, seasoned with a pinch of salt and pepper, and topped with tangy pickles, chopped onions, ketchup, mustard and two slices of melty American cheese.* <br><br> *Available at participating restaurants.',
        price: false
      },
      {
        name: 'Hamburger',
        description:
          'A juicy, 100% pure beef patty with absolutely no fillers, additives or preservatives, seasoned with a pinch of salt and pepper, and topped with a tangy pickle, chopped onions, ketchup and mustard.',
        price: false
      },
      {
        name: 'Quarter Pounder® Hamburger',
        description:
          'A ¼ pound 100% beef patty, slivered onions, ketchup, mustard on a toasted sesame seed bun.',
        price: false
      }
    ]
  },
  {
    restaurantId: '4bb677126edc76b0e7fd301c',
    name: 'Puerto Vallarta Mexican Restaurant',
    distance: 4381,
    lat: 41.81591479506006,
    long: -72.86769143849651,
    categoryId: '4bf58dd8d48988d1c1941735',
    categoryShortName: 'Mexican',
    price: {
      tier: 2,
      message: 'Moderate',
      currency: '$'
    },
    rating: 8.1,
    phone: '8606751999',
    menu: false
  },
  {
    restaurantId: '4ba8ced6f964a5209bf039e3',
    name: 'Starbucks',
    distance: 4794,
    lat: 41.81639092,
    long: -72.8627379,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: {
      tier: 2,
      message: 'Moderate',
      currency: '$'
    },
    rating: 8.3,
    phone: '8606771275',
    menu: false
  },
  {
    restaurantId: '54b5537e498e46b9ea8b117d',
    name: 'Truffles Bakery',
    distance: 5274,
    lat: 41.81408000599044,
    long: -72.85640568144657,
    categoryId: '4bf58dd8d48988d16d941735',
    categoryShortName: 'Café',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 6.6,
    menu: false
  },
  {
    restaurantId: '4baa847af964a520ce703ae3',
    name: 'Golf Club of Avon',
    distance: 5996,
    lat: 41.79208065008841,
    long: -72.85059928894043,
    categoryId: '4bf58dd8d48988d1e6941735',
    categoryShortName: 'Golf Course',
    price: 0,
    rating: 0,
    phone: '8606733216',
    menu: false
  },
  {
    restaurantId: '4c16ace0daf42d7f338b4466',
    name: 'Cumberland Farms',
    distance: 5999,
    lat: 41.76987336356651,
    long: -72.97018826007843,
    categoryId: '4d954b0ea243a5684a65b473',
    categoryShortName: 'Convenience Store',
    price: 0,
    rating: 6,
    phone: '8606736520',
    menu: false
  },
  {
    restaurantId: '583cd68844587f3c63bc9706',
    name: 'Taprock Beer Bar & Refuge',
    distance: 6535,
    lat: 41.75495683879838,
    long: -72.88660668844965,
    categoryId: '4bf58dd8d48988d157941735',
    categoryShortName: 'New American',
    price: {
      tier: 3,
      message: 'Expensive',
      currency: '$'
    },
    rating: 8,
    phone: '8604042074',
    menu: false
  },
  {
    restaurantId: '554a620c498ec595b67cbe32',
    name: "Dom's Coffee",
    distance: 7236,
    lat: 41.810382422557076,
    long: -72.83232758345521,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 8,
    menu: false
  },
  {
    restaurantId: '4b1ad027f964a5205cf223e3',
    name: "Bruegger's Bagel Bakery",
    distance: 7642,
    lat: 41.807357068484286,
    long: -72.82739818096167,
    categoryId: '4bf58dd8d48988d179941735',
    categoryShortName: 'Bagels',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 6.9,
    phone: '8606741755',
    menu: false
  },
  {
    restaurantId: '4c2bcc8e2219c928832fa548',
    name: 'Max a Mia',
    distance: 7891,
    lat: 41.80784549697253,
    long: -72.82439679926341,
    categoryId: '4bf58dd8d48988d110941735',
    categoryShortName: 'Italian',
    price: {
      tier: 4,
      message: 'Very Expensive',
      currency: '$'
    },
    rating: 8.4,
    phone: '8606776299',
    menu: [
      {
        name: 'Lobster',
        description:
          'Hand picked lobster, wood roasted corn, toybox tomatoes, mozzarella, truffle-garlic cream',
        price: '18.95'
      },
      {
        name: 'Hanger Steak*',
        description:
          'Oak grilled hanger steak, farm fresh eggs, bacon onion hash, hollandaise',
        price: '16.95'
      },
      {
        name: 'Oak Grilled Salmon*',
        description:
          'Warm quinoa salad, pancetta, brussels sprout leaves, white acacia truffle honey vinaigrette, shaved fennel',
        price: '15.95'
      },
      {
        name: 'Fig',
        description:
          'Fresh figs, smoked prosciutto, gorgonzola mountain, shaved kale, vincotto',
        price: '15.95'
      },
      {
        name: 'Polpetti*',
        description:
          'Fontina, ricotta, veal & pork meatballs, roasted red and yellow peppers, plum tomato sauce',
        price: '14.95'
      }
    ]
  },
  {
    restaurantId: '4b8aedbff964a520b88932e3',
    name: 'Wood-n-Tap',
    distance: 9355,
    lat: 41.740848308465104,
    long: -72.85227356744811,
    categoryId: '4bf58dd8d48988d14e941735',
    categoryShortName: 'American',
    price: {
      tier: 2,
      message: 'Moderate',
      currency: '$'
    },
    rating: 8.6,
    phone: '8607736736',
    menu: [
      {
        name: 'Bison Bites - (Cooked to Order)',
        description:
          'Mini bison burgers with a touch of chipotle pepper, American cheese, avocado aioli, & onion strings.',
        price: '76.00'
      },
      {
        name: 'Shrimp Cocktail',
        description: 'Crisp tiger shrimp and a spicy cocktail sauce.',
        price: '75.00'
      },
      {
        name: 'Scallops Wrapped in Bacon',
        description:
          'Large sea scallops with smoky bacon and a dijon dipping sauce.',
        price: '75.00'
      },
      {
        name: 'Smoked Bbq Ribs',
        description:
          "Finger-food sized, served with Uncle Fred's Secret Sauce.",
        price: '68.00'
      },
      {
        name: 'Petite Crab Cakes',
        description: 'Bite-size crab cakes served with a Dijon aioli.',
        price: '65.00'
      }
    ]
  },
  {
    restaurantId: '4b4f341ff964a52028fd26e3',
    name: "Abigail's Grille and Wine Bar",
    distance: 9990,
    lat: 41.846793454052936,
    long: -72.81070042805653,
    categoryId: '4bf58dd8d48988d157941735',
    categoryShortName: 'New American',
    price: {
      tier: 4,
      message: 'Very Expensive',
      currency: '$'
    },
    rating: 7.8,
    phone: '8602641580',
    menu: false
  },
  {
    restaurantId: '4bb7532eef159c74a10577f7',
    name: 'Dunkin Donuts',
    distance: 10779,
    lat: 41.7338786194022,
    long: -72.83643933921836,
    categoryId: '4bf58dd8d48988d148941735',
    categoryShortName: 'Donuts',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 7.2,
    phone: '8606781999',
    menu: [
      {
        name: 'Breakfast Sandwiches',
        description:
          'Smoked cherry wood bacon, egg white omelets, aged cheddar cheese, a freshly baked croissant, a hearty bagel, english muffin, crispy flatbreadwed go on, but we know youre already drooling. luckily, you can head to your local dd anytime to satisfy your hunger.',
        price: false
      },
      {
        name: 'Chicken Salad Sandwich',
        description: false,
        price: false
      },
      {
        name: 'Texas Toast Grilled Cheese',
        description:
          "We've raised the bar on the basic grilled cheese you ate as a kid. melted american and white cheddar cheese between two pieces of thick texas toast. yes, it's as good as it sounds.",
        price: false
      },
      {
        name: 'Tuna Sandwiches',
        description:
          'Our tasty tuna sandwich is blended with mayonnaise, celery, herbs and spices all on a toasted plain bagel. or, try our oven-toasted tuna melt, featuring the same tasty ingredients and topped with a slice of cheddar cheese on a croissant. both will hit the spot and keep you runnin.',
        price: false
      },
      {
        name: 'Turkey, Cheddar & Bacon',
        description:
          "Freshly sliced turkey topped with cherrywood smoked bacon and white cheddar cheese. it's a great way to brighten up your afternoon. your appetite - and your busy schedule - will thank you.",
        price: false
      }
    ]
  },
  {
    restaurantId: '4b87d7b8f964a520bece31e3',
    name: 'Brookside Bagels',
    distance: 10966,
    lat: 41.86319365155949,
    long: -72.80970724054166,
    categoryId: '4bf58dd8d48988d179941735',
    categoryShortName: 'Bagels',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 8.3,
    phone: '8606511492',
    menu: false
  },
  {
    restaurantId: '500f36d4e4b0dbaf8f4bc806',
    name: "Millwright's Restaurant & Tavern",
    distance: 11301,
    lat: 41.870058592869015,
    long: -72.81134092816636,
    categoryId: '4bf58dd8d48988d14e941735',
    categoryShortName: 'American',
    price: {
      tier: 2,
      message: 'Moderate',
      currency: '$'
    },
    rating: 9.1,
    phone: '8606515500',
    menu: false
  },
  {
    restaurantId: '4b34dbfef964a520da2825e3',
    name: 'Starbucks',
    distance: 11812,
    lat: 41.72785569,
    long: -72.82671629,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: {
      tier: 1,
      message: 'Cheap',
      currency: '$'
    },
    rating: 7.6,
    phone: '8606748405',
    menu: [
      {
        name: 'Wheat Spinach Savory Foldover',
        description:
          'Layers of wheat croissant with flax seed envelop a savory medley of spinach, shallots, white wine & béchamel sauce.',
        price: false
      },
      {
        name: 'Chonga Bagel',
        description:
          'A bagel topped with Cheddar cheese, poppy seeds, sesame seeds, onion and garlic.',
        price: false
      },
      {
        name: 'Almond Croissant Blossom',
        description:
          'Flaky croissant dough topped with almond filling and toasted sliced almonds.',
        price: false
      },
      {
        name: 'Banana Nut Bread',
        description:
          'Bananas, walnuts and pecans in moist, nutty, classic banana bread.',
        price: false
      },
      {
        name: 'Blueberry Muffin with Yogurt and Honey',
        description: 'A flavorful muffin with blueberries, yogurt and honey.',
        price: false
      }
    ]
  },
  {
    restaurantId: '4bdb3d913904a593e56c499e',
    name: 'Cumberland Farms',
    distance: 11999,
    lat: 41.70313327307127,
    long: -72.88780152797699,
    categoryId: '4d954b0ea243a5684a65b473',
    categoryShortName: 'Convenience Store',
    price: 0,
    rating: 7.5,
    phone: '8606741028',
    menu: false
  }
];

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

const dummyUserData = {
  weights: {
    categories: 0.1,
    priceRange: 0.4,
    rating: 0.3,
    range: 0.2
  },
  categories: {
    '4bf58dd8d48988d1d2941735': 0.7,
    '4bf58dd8d48988d1e0931735': 0.7,
    '4bf58dd8d48988d1ca941735': 0.4
  },
  priceTier: 2,
  rating: 2,
  distance: 5000
};

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
  const rangeScore = calculateRangeWeighted(venue, userData, 5000);
  const ratingScore = calculateRatingWeighted(venue, userData);
  const savorScore = categoryScore + priceScore + rangeScore + ratingScore;
  console.log('----------------------------------------');
  console.log(venue.name);
  console.log('CATEGORY WEIGHT: ', categoryScore);
  console.log('PRICE WEIGHT: ', priceScore);
  console.log('RANGE WEIGHT: ', rangeScore);
  console.log('RATING WEIGHT: ', ratingScore);
  console.log('SAVOR SCORE: ', savorScore);
  return savorScore;
};

const rateVenue = (venues, userData) => {
  const keyedVenues = {};
  const ratings = [];
  venues.forEach(venue => {
    keyedVenues[venue.restaurantId] = venue;
    keyedVenues[venue.restaurantId].savor = calculateSavor(venue, userData);
    ratings.push(calculateSavor(venue, userData));
  });
};

//const adjustCatWeights = (catSelected, userData) => {}
rateVenue(dummyData, dummyUserData);
