const express = require('express');
const router = express.Router();
const User = require('../models/User')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
  const { username, password } = req.body;

  const user = new User({
    username,
    password
  })

  user.save().then(data => {
    res.status(201).json({
      ...data
    })
  }).catch(err => {
    res.json(err)
  })

});


module.exports = router;
