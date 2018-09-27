# ESTABLISHING NORMS

- [App Goals](#app-goals)
- [Social Contract](#social-contract)
- [Establishing Norms](#establishing-norms)
- [Idea Consensus](#idea-consensus)
- [Product Outline](#product-outline)
- [Technical Outline](#technical-outline)

# App Goals

- Avoid paradox of choice
- Reduce time to get food

# Social Contract

###### What does this group do when two or more members disagree (ex. on a technical approach, a technology choice, etc)?

- The whole group gets involved to make a decision

###### What does this group do when a member is frustrated?

- Bring it up to the team sooner rather than later, feel comfortable in telling everyone on the team that you are frustrated

###### What does this group do when we merge our work together?

- Merge it together
- Do a “code reading” after the morning stand-up; read your code out loud to the team line-by-line

###### When does this group ask for help?

- After 15 minutes, as soon as you think it’s a waste of time to not ask for help
- Ask the rest of the group but if they don’t have an answer…
- Help ticket

###### How do we pair? What do we do when two group members pair with each other?

- On a feature basis when we think we need to pair, not a fixed amount of time but try to be balanced (at 30 min, bring it up...)

###### How does this group approach work "after hours" (i.e. after normal class hours and weekends)?

- If you plan on working afterwards, try to make it clear to each other what you’re going to do… avoid repeat work.

###### What time does this group have daily stand up?

- First thing in the morning, right after lunch both good times
- touchbase at 4 MST / 5 CST / 6 EST

# IDEA CONSENSUS

###### What is your product idea?

Highly opinionated restaurant / food chooser

###### Who are your users?

Indecisive people who want to try new foods / food trucks

###### What learning goals of yours does it meet and which goals does it not meet?

###### Morgan:

- ###### Goals met:
  - Full-stack development across new stack
  - Algorithmic thinking important in selecting
- ###### Goals not met:
  - Not working with Sequelize
  - Not working with Express (current stack)

###### John:

- ###### Goals met
  - Develop an app with priority given to UX and design
  - Use React native to build mobile apps
  - Will be a fully deployed app by the time we’re done
- ###### Goals not met
  - Learn more about O-Auth and Login (taken by Firebase)
  - Might need to put in real data by hand

###### Adil:

- ###### Goals met:
  - Tangible problem I’ve had before solved
  - Get excuse to use modern tools and technology (Firebase, react native, stripe, etc.)
- ###### Goals not met
  - Potentially pulling in a lot of sample data (yelp api might be limited) -- not real data
  - Scraping knowledge not explored

###### What do you find exciting about this idea, what do you find boring, what do you find daunting?

###### Morgan:

- Exciting
- Algorithms to suggest recommendations
- Front end algorithms to ratchet
- Boring / meh
  - Fixing bugs in React Native
  - Learning Firebase
  - Using a map
- Daunting
  - Learning React Native

###### John:

- Exciting
  - Building a polished app for web / mobile
  - Stitching together multiple technologies
- Boring / meh
  - This discussion
- Daunting
  - Making the UX feel fluid

###### Adil:

- Exciting
  - It will be a lot of algorithms in practical application
  - Uses GPS to drive a decision using a map
- Boring / meh
  - Plugging in Firebase to React Native -- may be rote
- Daunting
  - Learning a lot of CSS
  - Plugging in Firebase to React Native (both)
  - Mac/Linux/iOS/Android cross platform development

# PRODUCT OUTLINE

This should cover ~2 weeks.

The user facing application will help a single indecisive restaurant chooser make a decision based on their preset preferences in a minimal number of steps
The food truck facing application will provide guidance to the truck owner where their favorite users are so they can move their business closer to their eaters.

# USER STORIES

## MVP

- As a user, I want to be able to log in to save my preferences
- As a user, I want to set my preferences for food type
- As a user, I want to set my default travel distance
- As a user,I want to set my default price range
- As a user,I want to be able to navigate to the recommended restaurant in one click after configuring preferences
- As a user,I want to open the app and immediately be shown a suggestion to eat based on my preset preferences.
- As a user,I want to be able to see 3 or fewer options from the same restaurant if I do not want the initial food suggestion
- As a user, I want to be able to view the next best recommended restaurant if I do not like the three suggested food items for the current restaurant.
- As a user, I want to make 9 or fewer clicks within the app after setup.
  ??? - do we need a logged in user?

## Non-MVP

### Should have completed for final

- As a restaurant, I want to be able to create a profile
- As a restaurant, I want to be able to display my menu / prices
- As a user, I want to be able to order food for pick-up
- Mark your favorite restaurants / trucks
- Rate restaurants
- Purchase an item and get a confirmation
- Keep track of order history and let them reorder, but also keep recommending new things

### Nice to have

- Suggest location to a food truck based on where users that have favorited it are
- Allow user to set food allergies and preferences
- You can 'follow' your fav food trucks and get notified when they're nearby
- Register as restaurant / food truck and input menu via form

### _VERY_ nice to have

- Restaurant can view incoming orders while logged in (requires socket.io)
- Mark as complete
- Truck can update location and send a tweet automatically
- Restaurant menu includes tags for each item, so they can be filtered based on user-preferences

# PROJECT BOARD / GITHUB REPO

## WIREFRAMES

- See repo [here](https://github.com/Hangry-App/Hangry)

# TECHNICAL OUTLINE

## Data models

```js
const users = {
  john: {
    fist: 'John',
    last: 'Riccardi',
    email: 'riccjohn@gmail.com',
    password: '3lkj4930;jklj', // this would be hashed
  },
};

const cuisinePreferences = {
  mexican: {
    hasPreference: {
      john: true,
      adil: true,
    },
  },
  japanese: {
    hasPreference: {
      adil: true,
      morgan: true,
    },
  },
};

const defaultDistances = {
  walk: {
    hasPreference: {
      john: true,
      adil: true,
    },
  },
  bike: {
    hasPreference: {
      john: true,
      adil: true,
    },
  },
  drive: {
    hasPreference: {
      morgan: true,
    },
  },
};
```

## DATA FLOW DIAGRAM (for most important user actions)

## STARTING POINT CODE

- expo init code & firebase

## TOOLING & DEV ENVIRONMENT

- android sim (Morgan, John)
- iOS sim (John, Adil)
- expo, react-native (all)

## LIBRARIES & TOOLS

- expo, react native, firebase, foursquare api

## RISKS & CHALLENGES

Realtime GPS location shown on a map

- React native implementation
- Card swiping UI with ratcheting mechanic
- Learning how to use Firebase
- Handing off nav to default map app
- handling data with foursquare api + our backend
- socket.io

## PROOF OF CONCEPT DETAILS

- React native app showing current GPS location
- dev environments set up on our machines

## PROOF OF CONCEPT

- React Native app that can show the Mapbox API

### Things to think about

- Twilio
- Break down the send/receiving orders into tiers
