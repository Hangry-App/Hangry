const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getAllVenues = require('./getVenues');
const rateVenues = require('./rateVenues');
admin.initializeApp();

exports.returnVenues = functions.https.onRequest(async (req, res) => {
    const foundVenues = await getAllVenues(
        `${req.query.lat},${req.query.long}`,
        `${req.query.distance}`,
        `${req.query.listOfCategories}`,
        10
    )
    console.log('--------------------------------');
    console.log(foundVenues);
    console.log('--------------------------------');
    const ratedVenues = rateVenues(
        foundVenues, {
            weights: {
                categories: req.query.categories,
                priceRange: req.query.priceTier,
                rating: req.query.rating,
                range: req.query.range,
            },
            categories: {
                '4d4b7105d754a06374d81259':
                    req.query['4d4b7105d754a06374d81259'] || 0.0,
                '4bf58dd8d48988d1ca941735':
                    req.query['4bf58dd8d48988d1ca941735'] || 0.0,
                '4bf58dd8d48988d14e941735':
                    req.query['4bf58dd8d48988d14e941735'] || 0.0,
                '4bf58dd8d48988d145941735':
                    req.query['4bf58dd8d48988d145941735'] || 0.0,
                '4bf58dd8d48988d1d2941735':
                    req.query['4bf58dd8d48988d1d2941735'] || 0.0,
                '4bf58dd8d48988d1c1941735':
                    req.query['4bf58dd8d48988d1c1941735'] || 0.0,
                '4bf58dd8d48988d1bd941735':
                    req.query['4bf58dd8d48988d1bd941735'] || 0.0,
                '4bf58dd8d48988d10f941735':
                    req.query['4bf58dd8d48988d10f941735'] || 0.0,
                '4eb1bfa43b7b52c0e1adc2e8':
                    req.query['4eb1bfa43b7b52c0e1adc2e8'] || 0.0,
                '4bf58dd8d48988d149941735':
                    req.query['4bf58dd8d48988d149941735'] || 0.0,
            },
            priceTier: req.query.priceTier,
            rating: req.query.ratingPref,
            distance: req.query.distance,
        }, req.query.distance
    );
    console.log('--------------------------------');
    console.log(ratedVenues);
    console.log('--------------------------------');
    res.send(ratedVenues);
})