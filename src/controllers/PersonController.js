const ProductModel = require('../models/ProductModel');

module.exports = {
  all: function(req, res) {
    ProductModel.find({}).lean().exec(function(err, prodcts) {
      if(err)
        return res.json([]);
      return res.json(prodcts);
    });
  }
};