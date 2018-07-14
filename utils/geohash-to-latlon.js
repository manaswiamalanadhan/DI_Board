const GeoHash = require('latlon-geohash');

/**
 * return {lat:'', lon: ''} for a given geohash
 * @param geohash
 */
const GeoHashToLatLon = geohash => GeoHash.decode(geohash);

module.exports = GeoHashToLatLon;