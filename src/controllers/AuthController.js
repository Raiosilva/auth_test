const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const consts = require('../../consts');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async function(req, res) {
    try {
      let u = await UserModel.findOne({ email: req.body.email });
      if (!u) {
        const user = new UserModel(req.body);
        user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
        await user.save();
        delete user.password;
        res.status(200).json(user);
      }
      else {
        res.status(403).json({ message: 'Email already register', error: {}});
      }
    } catch (e) {
      res.status(500).json({ message: 'Error while saving the user', error: e});
    }
  },
  login: function(req, res) {
    const password = req.body.password;
    const email = req.body.email;

    UserModel.findOne({ email: email }).lean().exec(function(err, user) {
      if(err) {
        return res.status(500).json({
          message: 'Server error', error: err
        });
      }
      const auth_err = (password == '' || password == null || !user);

      if (!auth_err) {
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({_id: user._id}, consts.kyJWT, {expiresIn: consts.expiresJWT});
          delete user.password;
          return res.json({...user, token: token});
        }
      }
      return res.status(404).json({ message: 'Wrong e-mail or password '});
    });
  }
};