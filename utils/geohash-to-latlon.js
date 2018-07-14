var GeoHash = require('latlon-geohash');

/**
 * return {lat:'', lon: ''} for a given geohash
 * @param {} geohash 
 */
var GeoHashToLatLon = (geohash) => {
    return GeoHash.decode(geohash);
};

module.exports = GeoHashToLatLon;