const { Router } = require('express');
const bcrypt = require('bcrypt');

const User = require('./model');
const { toJWT } = require('../auth/jwt');

const router = new Router();

router.post('/users', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = {
      email,
      password: bcrypt.hashSync(password, 10)
    };
    User.create(user).then(res.send({ jwt: toJWT({ userId: 1 }) }));
  } else {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    });
  }
});

module.exports = router;
