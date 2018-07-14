var GeoHash = require('latlon-geohash');

/**
 * return {lat:'', lon: ''} for a given geohash
 * @param {} geohash 
 */
export default function(geohash) {
    return GeoHash.decode(geohash);
}