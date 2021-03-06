const testData = [
  {
    "restaurantId": "50659f4de4b0bd91e00b97e0",
    "name": "Starbucks",
    "distance": 952,
    "lat": 40.76742,
    "long": -111.89142,
    "categoryId": "4bf58dd8d48988d1e0931735",
    "categoryShortName": "Coffee Shop",
    "price": {
      "tier": 1,
      "message": "Cheap",
      "currency": "$"
    },
    "rating": 8.3,
    "phone": "8013553037",
    "menu": false,
    "savorScore": "84"
  },
  {
    "restaurantId": "4ad4f28ef964a52013fd20e3",
    "name": "Red Rock Brewing Co.",
    "distance": 343,
    "lat": 40.76371377115242,
    "long": -111.89713768871168,
    "categoryId": "50327c8591d4c4b30a586d5d",
    "categoryShortName": "Brewery",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 8.4,
    "phone": "8015217446",
    "menu": [
      {
        "name": "Filet Mignon**",
        "description": "Broiled 7 oz. tenderloin of beef served with sautéed mushrooms & topped with Béarnaise butter*",
        "price": "26.00"
      },
      {
        "name": "Alaskan Sautéed Halibut",
        "description": "Sauteed spinach, lemon caper butter sauce",
        "price": "24.00"
      },
      {
        "name": "New York Steak**",
        "description": "Broiled 12 oz. steak served with sautéed mushrooms & topped with Béarnaise butter*",
        "price": "24.00"
      },
      {
        "name": "Alaskan Halibut Fish & Chips",
        "description": "Red Rock beer battered, coleslaw",
        "price": "20.00"
      },
      {
        "name": "Flat Iron Steak**",
        "description": "Broiled 9 oz. steak topped with Gorgonzola butter & crispy onion straws*",
        "price": "20.00"
      }
    ],
    "savorScore": "74"
  },
  {
    "restaurantId": "4ae7198ef964a52067a821e3",
    "name": "Squatters Pub Brewery",
    "distance": 477,
    "lat": 40.762552336133,
    "long": -111.89547300338744,
    "categoryId": "50327c8591d4c4b30a586d5d",
    "categoryShortName": "Brewery",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 8.6,
    "phone": "8013632739",
    "menu": [
      {
        "name": "Ahi Spring Roll",
        "description": "Orca Bay yellowfin tuna spring rolls, flash-fried and served over shredded red cabbage and arugula with pickled ginger, wasabi aioli and soy-ginger vinaigrette.",
        "price": "14.99"
      },
      {
        "name": "Buffalo",
        "description": "100% fresh ground bison with Polygamy Porter BBQ sauce, cheddar and onion straws.",
        "price": "14.99"
      },
      {
        "name": "Fish & Chips",
        "description": "American Wheat hefeweizen battered Alaskan cod with your choice of fries.",
        "price": "13.99"
      },
      {
        "name": "Locals Only",
        "description": "All local Creminelli calabrese salami, Mountain view mushrooms, Beehive cheese fresh mozzarella, big j flour and house-made marinara.",
        "price": "13.99"
      },
      {
        "name": "Black and Blue",
        "description": "Cajun spiced Niman ranch ground chuck, blue cheese and Daily's bacon.",
        "price": "12.99"
      }
    ],
    "savorScore": "73"
  },
  {
    "restaurantId": "4ce4348bbebd370405afa4a0",
    "name": "The Rose Establishment",
    "distance": 157,
    "lat": 40.7640947765476,
    "long": -111.9022840887633,
    "categoryId": "4bf58dd8d48988d16d941735",
    "categoryShortName": "Café",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 9.1,
    "phone": "8019906270",
    "menu": false,
    "savorScore": "72"
  },
  {
    "restaurantId": "4b612e69f964a520330c2ae3",
    "name": "Starbucks",
    "distance": 755,
    "lat": 40.75672813,
    "long": -111.8976693,
    "categoryId": "4bf58dd8d48988d1e0931735",
    "categoryShortName": "Coffee Shop",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 8.3,
    "phone": "8015321367",
    "menu": false,
    "savorScore": "71"
  },
  {
    "restaurantId": "50f19acde4b036c5c8613022",
    "name": "Eva's Bakery",
    "distance": 920,
    "lat": 40.76578932405195,
    "long": -111.89082815252097,
    "categoryId": "4bf58dd8d48988d16a941735",
    "categoryShortName": "Bakery",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 8.9,
    "phone": "8013553942",
    "menu": false,
    "savorScore": "70"
  },
  {
    "restaurantId": "4b2bc755f964a520ccba24e3",
    "name": "Red Iguana 2",
    "distance": 1470,
    "lat": 40.7697224553498,
    "long": -111.91610829207085,
    "categoryId": "4bf58dd8d48988d151941735",
    "categoryShortName": "Tacos",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 9.1,
    "phone": "8013221489",
    "menu": false,
    "savorScore": "67"
  },
  {
    "restaurantId": "4adf49fff964a5201f7921e3",
    "name": "Red Iguana",
    "distance": 1362,
    "lat": 40.77167732469157,
    "long": -111.91250234444355,
    "categoryId": "4bf58dd8d48988d1c1941735",
    "categoryShortName": "Mexican",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 9.3,
    "phone": "8013221489",
    "menu": [
      {
        "name": "Parrillada",
        "description": "For seafood lovers an exquisite dish: grilled lobster, shrimp, scallops, tuna and crab topped with melted cheese. garnished with lettuce, tomatoes, cucumbers, jalapenos and melted butter on the side. served with spanish rice",
        "price": "31.45"
      },
      {
        "name": "Lomo De Puerco En Mole De Almendras",
        "description": "Almonds, chile guajillo, chile guero, yellow zucchini, milk, peanut butter and onions, served with a roasted pork loin stuffed with dried fruit, sun-dried tomatoes, swiss chard and pine nuts",
        "price": "16.75"
      },
      {
        "name": "Puntas De Filete a La Nortena",
        "description": "Top sirloin tips sauteed with bacon, jalapenos strips, onions and fresh tomatoes, served atop the almond mole. refried beans and tortillas complete this much loved dish",
        "price": "15.85"
      },
      {
        "name": "Shrimp Sonora",
        "description": "Seven large tiger prawns sauteed in garlic and butter with lemon and a hint of pepper. served with mexican white rice, black beans, & tortillas",
        "price": "15.75"
      },
      {
        "name": "Red Pipian",
        "description": "A pumpkin seed sauce made with dried chile guajillo, peanuts, pepitas, onions, tomatoes, tossed with chicken",
        "price": "15.70"
      }
    ],
    "savorScore": "66"
  },
  {
    "restaurantId": "4b077142f964a520a3fd22e3",
    "name": "Gourmandise - The Bakery",
    "distance": 1528,
    "lat": 40.76381607648126,
    "long": -111.8830002839329,
    "categoryId": "4bf58dd8d48988d16a941735",
    "categoryShortName": "Bakery",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 8.8,
    "phone": "8013283330",
    "menu": [
      {
        "name": "Lox and Bagel",
        "description": "Nova scotia lox and cream cheese on a toasted bagel tomato capers onion and slices and fruit garnish",
        "price": "7.35"
      },
      {
        "name": "Tuskan Salad",
        "description": "Iceberg and Romaine lettuces, tossed with crabmeat cucumbers tomatoes, hard boiled egg and croutons",
        "price": "6.95"
      },
      {
        "name": "Pastrami and Swiss",
        "description": "Thinly sliced pastrami covered with open eye Swiss cheese green leaf lettuce and freshly sliced tomatoes for both top and bottom",
        "price": "6.95"
      },
      {
        "name": "Turkey Club",
        "description": "Sliced turkey with green leaf lettuce and tomatoes for the first half crispy bacon green leaf lettuce and tomatoes for the second half",
        "price": "6.95"
      },
      {
        "name": "Gourmandies Combo",
        "description": "Tuna salad in a wedged tomato, turkey salad on a bed of lettuce, cottage cheese and  fruit garnish",
        "price": "6.75"
      }
    ],
    "savorScore": "64"
  },
  {
    "restaurantId": "4fdb4ce9e4b03cded9ce2acc",
    "name": "Starbucks",
    "distance": 2463,
    "lat": 40.760914,
    "long": -111.87201,
    "categoryId": "4bf58dd8d48988d1e0931735",
    "categoryShortName": "Coffee Shop",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 8.3,
    "phone": "8013598132",
    "menu": false,
    "savorScore": "62"
  },
  {
    "restaurantId": "4ad4f28ef964a520d7fc20e3",
    "name": "Kimpton Hotel Monaco Salt Lake City",
    "distance": 820,
    "lat": 40.764754,
    "long": -111.891652,
    "categoryId": "4bf58dd8d48988d1fa931735",
    "categoryShortName": "Hotel",
    "price": 0,
    "rating": 8.3,
    "phone": "8015950000",
    "menu": false,
    "savorScore": "NaN"
  },
  {
    "restaurantId": "4b9701a7f964a52013f334e3",
    "name": "Starbucks",
    "distance": 4880,
    "lat": 40.72562530008308,
    "long": -111.87084609654704,
    "categoryId": "4bf58dd8d48988d1e0931735",
    "categoryShortName": "Coffee Shop",
    "price": {
      "tier": 1,
      "message": "Cheap",
      "currency": "$"
    },
    "rating": 7.6,
    "phone": "8014832974",
    "menu": false,
    "savorScore": "62"
  },
  {
    "restaurantId": "5000134ee4b049e4abacfa60",
    "name": "French Meadow Bakery",
    "distance": 7083,
    "lat": 40.786666286950656,
    "long": -111.97909988357453,
    "categoryId": "4bf58dd8d48988d16a941735",
    "categoryShortName": "Bakery",
    "price": {
      "tier": 1,
      "message": "Cheap",
      "currency": "$"
    },
    "rating": 5.8,
    "menu": false,
    "savorScore": "50"
  },
  {
    "restaurantId": "5096a7b1e4b0a7026376e116",
    "name": "Popeyes Louisiana Kitchen",
    "distance": 7101,
    "lat": 40.788130102212726,
    "long": -111.97853390115384,
    "categoryId": "4d4ae6fc7a7b7dea34424761",
    "categoryShortName": "Fried Chicken",
    "price": {
      "tier": 1,
      "message": "Cheap",
      "currency": "$"
    },
    "rating": 6.2,
    "menu": false,
    "savorScore": "50"
  },
  {
    "restaurantId": "4dbaa69b4b22153e34b721a3",
    "name": "Starbucks",
    "distance": 7315,
    "lat": 40.78674345,
    "long": -111.9820235,
    "categoryId": "4bf58dd8d48988d1e0931735",
    "categoryShortName": "Coffee Shop",
    "price": {
      "tier": 1,
      "message": "Cheap",
      "currency": "$"
    },
    "rating": 6.6,
    "phone": "8015752609",
    "menu": false,
    "savorScore": "49"
  },
  {
    "restaurantId": "5ae79e648194fc002c343ca4",
    "name": "Gordon Biersch Brewery Restaurant",
    "distance": 7088,
    "lat": 40.78576456359024,
    "long": -111.97963215555065,
    "categoryId": "4bf58dd8d48988d14e941735",
    "categoryShortName": "American",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 0,
    "menu": false,
    "savorScore": "44"
  },
  {
    "restaurantId": "500d84131648cb60d50b86ad",
    "name": "Smashburger",
    "distance": 7581,
    "lat": 40.78821043714702,
    "long": -111.98464793154264,
    "categoryId": "4bf58dd8d48988d16c941735",
    "categoryShortName": "Burgers",
    "price": {
      "tier": 2,
      "message": "Moderate",
      "currency": "$"
    },
    "rating": 6,
    "menu": false,
    "savorScore": "34"
  },
  {
    "restaurantId": "4c4745d619fde21e1cc80776",
    "name": "In-N-Out Burger",
    "distance": 9291,
    "lat": 40.691373278845376,
    "long": -111.95764795585703,
    "categoryId": "4bf58dd8d48988d16e941735",
    "categoryShortName": "Fast Food",
    "price": {
      "tier": 1,
      "message": "Cheap",
      "currency": "$"
    },
    "rating": 8.3,
    "phone": "8007861000",
    "menu": false,
    "savorScore": "34"
  },
  {
    "restaurantId": "50acf052e4b0c7ff4f20e283",
    "name": "Market Street Grill",
    "distance": 7355,
    "lat": 40.78708496350304,
    "long": -111.98235386793033,
    "categoryId": "4bf58dd8d48988d1ce941735",
    "categoryShortName": "Seafood",
    "price": {
      "tier": 3,
      "message": "Expensive",
      "currency": "$"
    },
    "rating": 6.2,
    "menu": false,
    "savorScore": "23"
  },
  {
    "restaurantId": "5050ff94e4b006e3d2d92bda",
    "name": "Cat Cora's Kitchen",
    "distance": 7077,
    "lat": 40.78771009321678,
    "long": -111.97845670636706,
    "categoryId": "4bf58dd8d48988d157941735",
    "categoryShortName": "New American",
    "price": {
      "tier": 3,
      "message": "Expensive",
      "currency": "$"
    },
    "rating": 6.7,
    "phone": "8013226304",
    "menu": false,
    "savorScore": "22"
  }
]
