# FourSquare API Research

- BEFORE GETTING STARTED:
  Setup a FourSquare developer account and test the outputs from the API here: https://foursquare.com/developers/explore#req=users%2Fself

## GET nearby venues

- Notes: https://developer.foursquare.com/docs/api/venues/search

GET https://api.foursquare.com/v2/venues/search
Sample: GET ...https://api.foursquare.com/v2/venues/search?ll=40.7630,-111.9011&radius=250&limit=10&categoryId=4d4b7105d754a06374d81259

### Useful parameters

1. ll - latitude, longitude - format: ##.####, ##.#### - my example: 40.7630,-111.9011
2. radius - meters - format: ### - my example: 500
3. limit - resultCount - format: ## - my example: 10
4. categoryId - categoriesCommaSeparated - format: #a#b#c#d#e#fasads - my exammple: 4d4b7105d754a06374d81259 (this is food, see categories documentation for deeper levels of categorization (ie. pizza = 4bf58dd8d48988d1ca941735, etc.): https://developer.foursquare.com/docs/resources/categories)

## GET menu items

- Notes: https://developer.foursquare.com/docs/api/venues/menu

GET https://api.foursquare.com/v2/venues/VENUE_ID/menu
Sample: https://api.foursquare.com/v2/venues/4ad4f291f964a520f8fd20e3/menu

### Useful parameters

1. VENUE_ID - venueId - format: #l#3lL... (string) - my example: 4ad4f291f964a520f8fd20e3 (Tony Caputo's Market and Deli)

## GET a venue's tips

- Notes: https://developer.foursquare.com/docs/api/venues/tips

GET https://api.foursquare.com/v2/venues/VENUE_ID/tips
Sample: https://api.foursquare.com/v2/venues/4ad4f291f964a520f8fd20e3/tips?

### Useful parameters

1. VENUE_ID - venueId - format: #l#3lL... (string) - my example: 4ad4f291f964a520f8fd20e3 (Tony Caputo's Market and Deli)
