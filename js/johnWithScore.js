const dummyData = [ { restaurantId: '5081a3b2d63e3e73d4338d30',
    name: 'University Book Store Coffee Cart',
    distance: 1224,
    lat: 43.0748912126272,
    long: -89.39759731292725,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 0,
    menu: false,
    savorScore: '92' },
  { restaurantId: '4b4f582ff964a520420227e3',
    name: 'McDonald\'s',
    distance: 1149,
    lat: 43.06801777542838,
    long: -89.4045227766037,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 5.3,
    phone: '6082571102',
    menu: [ [Object], [Object], [Object], [Object], [Object] ],
    savorScore: '87' },
  { restaurantId: '4ad43881f964a52075e720e3',
    name: 'Nitty Gritty Restaurant & Bar',
    distance: 855,
    lat: 43.071879363581864,
    long: -89.39568670715576,
    categoryId: '4bf58dd8d48988d116941735',
    categoryShortName: 'Bar',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 7.8,
    phone: '6082512521',
    menu: false,
    savorScore: '85' },
  { restaurantId: '4b665819f964a5209f1e2be3',
    name: 'Starbucks',
    distance: 1196,
    lat: 43.07389817,
    long: -89.38273627,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 8,
    phone: '6082505020',
    menu: false,
    savorScore: '82' },
  { restaurantId: '4b3a7807f964a520116825e3',
    name: 'Ian\'s Pizza on State',
    distance: 1150,
    lat: 43.074913,
    long: -89.386999,
    categoryId: '4bf58dd8d48988d1ca941735',
    categoryShortName: 'Pizza',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 9.1,
    phone: '6082579248',
    menu: [ [Object], [Object], [Object], [Object], [Object] ],
    savorScore: '80' },
  { restaurantId: '4aea28ebf964a520deb921e3',
    name: 'Dotty Dumpling\'s Dowry',
    distance: 973,
    lat: 43.07298458901576,
    long: -89.39588621087248,
    categoryId: '4bf58dd8d48988d16c941735',
    categoryShortName: 'Burgers',
    price: { tier: 2, message: 'Moderate', currency: '$' },
    rating: 9.1,
    phone: '6082590000',
    menu: [ [Object], [Object], [Object], [Object], [Object] ],
    savorScore: '70' },
  { restaurantId: '55c17479498ec2a4ccb2a112',
    name: 'Colectivo Coffee',
    distance: 1147,
    lat: 43.074743679226295,
    long: -89.39562416312101,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: { tier: 2, message: 'Moderate', currency: '$' },
    rating: 8.7,
    phone: '6087091911',
    menu: false,
    savorScore: '67' },
  { restaurantId: '4d686a320a25b60c55821790',
    name: 'Great Dane Pub & Brewing Company',
    distance: 1381,
    lat: 43.07468710955784,
    long: -89.3803908048707,
    categoryId: '50327c8591d4c4b30a586d5d',
    categoryShortName: 'Brewery',
    price: { tier: 2, message: 'Moderate', currency: '$' },
    rating: 8.8,
    phone: '6084429000',
    menu: false,
    savorScore: '67' },
  { restaurantId: '4c24b64bb012b713988a0893',
    name: 'Graze',
    distance: 1303,
    lat: 43.07484887182121,
    long: -89.38232575948915,
    categoryId: '4bf58dd8d48988d155941735',
    categoryShortName: 'Gastropub',
    price: { tier: 2, message: 'Moderate', currency: '$' },
    rating: 9,
    phone: '6082512700',
    menu: [ [Object], [Object], [Object], [Object], [Object] ],
    savorScore: '67' },
  { restaurantId: '515ddf3de4b068af64c1468c',
    name: 'Colectivo Coffee',
    distance: 1324,
    lat: 43.074884,
    long: -89.381937,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: { tier: 2, message: 'Moderate', currency: '$' },
    rating: 8.8,
    phone: '6082550474',
    menu: false,
    savorScore: '67' },
  { restaurantId: '5596dacf498ef8cc220fb07f',
    name: 'Hopcat',
    distance: 1121,
    lat: 43.075062115179996,
    long: -89.39157820920616,
    categoryId: '4bf58dd8d48988d11b941735',
    categoryShortName: 'Pub',
    price: { tier: 2, message: 'Moderate', currency: '$' },
    rating: 8.7,
    phone: '6088071361',
    menu: [],
    savorScore: '67' },
  { restaurantId: '4afcc582f964a520bc2522e3',
    name: 'The Old Fashioned Tavern & Restaurant',
    distance: 1382,
    lat: 43.076153,
    long: -89.383526,
    categoryId: '4bf58dd8d48988d155941735',
    categoryShortName: 'Gastropub',
    price: { tier: 2, message: 'Moderate', currency: '$' },
    rating: 9.1,
    phone: '6083104545',
    menu: false,
    savorScore: '67' },
  { restaurantId: '5914f620c4df1d6ddc02a361',
    name: 'Eno Vino',
    distance: 1454,
    lat: 43.07635687443169,
    long: -89.38215837951033,
    categoryId: '4bf58dd8d48988d123941735',
    categoryShortName: 'Wine Bar',
    price: { tier: 2, message: 'Moderate', currency: '$' },
    rating: 8.8,
    phone: '6084550663',
    menu: false,
    savorScore: '67' },
  { restaurantId: '52869069498e3289da675b02',
    name: 'Starbucks',
    distance: 4980,
    lat: 43.055718033590246,
    long: -89.45089797472531,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 5.8,
    phone: '6088073978',
    menu: false,
    savorScore: '65' },
  { restaurantId: '4bbf538e30c99c743ef75411',
    name: 'Starbucks',
    distance: 6264,
    lat: 43.01610851,
    long: -89.429133,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 8.1,
    phone: '6082766875',
    menu: [ [Object], [Object], [Object], [Object], [Object] ],
    savorScore: '52' },
  { restaurantId: '56f03d38498eb3c16b03e9c2',
    name: 'Culver\'s',
    distance: 9430,
    lat: 43.06103350978347,
    long: -89.50682739776911,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 6.5,
    phone: '6082038024',
    menu: false,
    savorScore: '37' },
  { restaurantId: '4b743e7df964a5207fcf2de3',
    name: 'Starbucks',
    distance: 9081,
    lat: 43.05893389,
    long: -89.50234572,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 7.4,
    phone: '6088293646',
    menu: false,
    savorScore: '36' },
  { restaurantId: '54806dfb498e67f98a869485',
    name: 'Chick-fil-A',
    distance: 9175,
    lat: 43.058116,
    long: -89.503426,
    categoryId: '4bf58dd8d48988d16e941735',
    categoryShortName: 'Fast Food',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 8.4,
    phone: '6088334344',
    menu: false,
    savorScore: '34' },
  { restaurantId: '4ecc30f9775b4671dc78ebc7',
    name: 'Starbucks',
    distance: 9275,
    lat: 43.125614,
    long: -89.31271,
    categoryId: '4bf58dd8d48988d1e0931735',
    categoryShortName: 'Coffee Shop',
    price: { tier: 1, message: 'Cheap', currency: '$' },
    rating: 8.4,
    phone: '6082444013',
    menu: false,
    savorScore: '34' },
  { restaurantId: '56218518498ed6af88a19b46',
    name: 'Café Hollander',
    distance: 5184,
    lat: 43.07320209335286,
    long: -89.45375822123673,
    categoryId: '4bf58dd8d48988d155941735',
    categoryShortName: 'Gastropub',
    price: { tier: 3, message: 'Expensive', currency: '$' },
    rating: 8.6,
    phone: '6082373168',
    menu: false,
    savorScore: '31' } ]
