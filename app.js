const express = require('express');
const bodyparser = require('body-parser');
const mogoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/auth_test',
{ useNewUrlParser: true });



app.use(function(req, res, next) {
  res.status(404).send('Not found');
});

app.listen(3000);
