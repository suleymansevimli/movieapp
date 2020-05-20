const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then(hash => {
    const user = new User({
      username,
      password: hash
    })

    user.save().then(data => {
      res.status(201).json({
        ...data
      })
    }).catch(err => {
      res.json(err)
    })
  })

});

router.post('/authenticate', (req, res) => {
  const { username, password } = req.body
  console.log('Buraya düştü reis')
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      res.json(err)
    }
    if (!user) {
      res.json({
        status: "fail",
        message: "Authenticate failed"
      })
    } else {
      bcrypt.compare(password, user.password).then(check => {
        if (!check) {
          res.json({
            status: "fail",
            message: "Wrong password"
          })
        } else {
          const payload = {
            username
          }

          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 // 12 saat
          });

          res.json({
            status: "ok",
            token
          })
        }
      })
    }
  })

})


module.exports = router;
