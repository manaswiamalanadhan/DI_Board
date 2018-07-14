const GeoJson = require('geojson');

/**
 * return geojson of type linestring for a given batch data
 * @param {*} batchData 
 */
const GeoJsonForBatch = batchData => {
    //batch data is an array
    const data = batchData.sort(function(x, y){
        return x.time - y.time;
    }).map(data => {
        const lat = Number(data.latitude_longitude.split(",")[0].substring(1));
        const lon = Number(data.latitude_longitude.split(",")[1].split(")")[0]);
        return [lat, lon];
    });
    return GeoJson.parse({data}, {'LineString': 'data'});
};

module.exports = GeoJsonForBatch;