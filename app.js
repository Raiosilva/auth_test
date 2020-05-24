const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const api = require('./src/routes/api');
const auth = require('./src/routes/auth');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth_test',
{ useNewUrlParser: true });

app.use('/api', api);
app.use('/auth', auth);

app.use(function(req, res, next) {
  res.status(404).send('Not found');
});

app.listen(3000);
