const mongoose = require('mongoose');
const faker = require('faker');
const ProductModel = require('../models//ProductModel');

mongoose.connect('mongodb://localhost:27017/auth_test',
{ useNewUrlParser: true });

async function add(n) {
  try {
    for (let i = 0; i < n; i ++) {
      const p = new ProductModel();
      p.name = faker.commerce.productName();
      p.deparment = faker.commerce.department();
      p.price = faker.commerce.price();
      await p.save();
    }
  } catch (e) {
    console.log(e);
  }
}

add(100)
  .then(() => {
    console.log('Ok');
    mongoose.disconnect();
  });

