var GeoJson = require('geojson');

/**
 * return geojson of type linestring for a given batch data
 * @param {*} batchData 
 */
var GeoJsonForBatch = (batchData) => {
    //batch data is an array
    var data = batchData.sort(function(x, y){
        return x.time - y.time;
    }).map(data => {
        var lat = Number(data.latitude_longitude.split(",")[0].substring(1));
        var lon = Number(data.latitude_longitude.split(",")[1].split(")")[0]);
        return [lat, lon];
    });
    return GeoJson.parse({data}, {'LineString': 'data'});
}

module.exports = GeoJsonForBatch;