const mongoose = require('mongoose');
const faker = require('faker');
const PersonModel = require('../models/PersonModel');

mongoose.connect('mongodb://localhost:27017/auth_test',
{ useNewUrlParser: true });

async function add(n) {
  try {
    for (let i = 0; i < n; i ++) {
      const p = new PersonModel();
      p.name = faker.name.firstName();
      p.country = faker.address.country();
      p.email = faker.internet.email();
      p.company = faker.company.companyName();
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

