var express = require('express');
var router = express.Router();
var db = require('../utils/mongo');

router.get('/all', function(req, res) {
  var collection = db.get().collection('items_metadata');

  collection.find({"dish_family": "pav"}).toArray(function(err, docs) {
    res.send(docs);
  })
})

module.exports = router;
