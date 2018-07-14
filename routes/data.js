const express = require('express');
const router = express.Router();
const db = require('../utils/mongo');
const geoHashConverter = require('../utils/geohash-to-latlon');

/**
 * To test code
 */
router.get('/experiments', (req, res) => {
    const collection = db.get().collection('items_metadata');

    collection.find({"dish_family": "pav"}).toArray((err, docs) => {
        res.send(docs);
    })
});

/**
 * For cuisine aggregated by area points
 * returns array of objects of type
 * {
 *  location: { lat, lon },
 *  cuisine_name_1: number_of_items_of_cuisine_1,
 *  cuisine_name_2: number_of_items_of_cuisine_2,
 *  ...
 *  }
 */
router.get('/cuisine_geohash', (req, res) => {
    const collection = db.get().collection('cuisine_geohash');

    collection.find({}).toArray((err, docs) => {
        res.send(docs.map( doc => {
            // console.log('converting', data._id);
            doc.location = geoHashConverter(doc._id);
            delete doc._id;
            const cuisines = doc.cuisines.reduce((cum, cur) => { //cumulative, current
                if(cur in cum)
                    cum[cur]++;
                else
                    cum[cur]=1;
                return cum;
            }, {});
            delete doc.cuisines;
            return Object.assign(doc, cuisines);
        }));
    });
});

module.exports = router;
