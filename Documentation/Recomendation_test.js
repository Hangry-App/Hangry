const dummyData = [
    {
      "restaurantId": "4b463a75f964a520bf1a26e3",
      "name": "LaSalle Market and Deli",
      "distance": 379,
      "lat": 41.81061273935046,
      "long": -72.92285654813413,
      "categoryId": "4bf58dd8d48988d146941735",
      "categoryShortName": "Deli / Bodega",
      "price": {
        "tier": 1,
        "message": "Cheap",
        "currency": "$"
      },
      "rating": 8.4,
      "menu": [
        {
          "name": "Teriyaki Wrap",
          "description": "Chicken, flank or grilled salmon, teriyaki sauce, broccoli with sesame oil, red pepper flakes & jasmine rice",
          "price": "8.50"
        },
        {
          "name": "Grilled Meat Loaf",
          "description": "Cheddar, spicy mustard & mayo on a grilled french round",
          "price": "6.95"
        },
        {
          "name": "Soups of the Day",
          "description": "Three to choose from with fresh bread from new york",
          "price": "4.95"
        }
      ]
    },
    {
      "restaurantId": "55a5421a498e48e87c7f5640",
      "name": "Giv Coffee",
      "distance": 2699,
      "lat": 41.825408788961504,
      "long": -72.89644322182761,
      "categoryId": "4bf58dd8d48988d1e0931735",
      "categoryShortName": "Coffee Shop",
      "price": {
        "tier": 1,
        "message": "Cheap",
        "currency": "$"
      },
      "rating": 8
    },
    {
      "restaurantId": "4ba8ced6f964a5209bf039e3",
      "name": "Starbucks",
      "distance": 4794,
      "lat": 41.81639092,
      "long": -72.8627379,
      "categoryId": "4bf58dd8d48988d1e0931735",
      "categoryShortName": "Coffee Shop",
      "price": {
        "tier": 2,
        "message": "Moderate",
        "currency": "$"
      },
      "rating": 8.4
    }
  ]

const userData = {
    weights: {
        categories: 0.5,
        priceRange: 0.2,
        rating:     0.1,
        range:      0.2,
    },
    categories: {
        '4bf58dd8d48988d146941735': 0.80, //deli
        '55a5421a498e48e87c7f5640': 0.45, //coffee shop
    },
    priceTier: 2,
}

// Range Examples
// distance * tensInterval | out of minus prev | total times weight
// 379 * 0.002=0.758 ==> 10 - 0.758 = 9.242 ==> 9.242 * 0.5 = 4.621
// 2699 * 0.002 = 5.398 ==> 10 - 5.398 = 4.602 ==> 4.602 * 0.5 = 2.301
// 4500 * 0.002 = 9 ==> 10 - 9 = 1 ==> 1 * 0.5 = 0.5

// OB/JS: "normalize" is a useful word here, this is a good spot for unit testing

// Price Examples
// 2 * 2.5 = 5 ==> 10 - 5 = 5 ==> 5 * 0.2 = 1
// 2 * 2.5 = 5 ==> 10 - 5 = 5 ==> 5 * 0.2 = 1

const venuSort = (venues, userData) => {
    const keyedVenues = {}
    venues.forEach(venue => {
        keyedVenues[venue.restaurantId] = venue;
        keyedVenues[venue.restaurantId].savor = calcSavor(venue, userData);
    });
    console.log(keyedVenues);
}
const calcSavor = (venu, userData) => {
    const cat = calcCategoryWeighted(venu, userData);
    const prc = calcPriceWeighted(venu, userData);
    const rng = calcRangeWeighted(venu, userData, 300);
    console.log(cat, prc, rng)
    return (cat + prc) / 10;
}
calcCategoryWeighted = (venu, userData) => {
    if (userData.categories[venu.restaurantId]) {
        return 10 * userData.weights.categories
    } else {
        return 0 * userData.weights.categories
    }
}
calcPriceWeighted = (venu, userData) => {
    let diffrence;
    if (venu.price.tier >= userData.priceTier) {
        diffrence = venu.price.tier - userData.priceTier
    } else {
        diffrence = userData.priceTier - venu.price.tier
    }
    return (4 - diffrence) * userData.weights.priceRange;
}
calcRangeWeighted = (venu, userData, searchRange) => {
    return (venu.distance * (10 / searchRange)) * userData.weights.range
}

venuSort(dummyData, userData);