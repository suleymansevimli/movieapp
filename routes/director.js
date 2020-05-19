const express = require('express');
const router = express.Router();

const Director = require('../models/Director')

// post 
router.post('/', (req, res, next) => {
  const director = new Director(req.body)

  director.save()
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(500).json({
        ...err
      })
    })
});

// get
router.get('/', (req, res) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movie',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movie'
      }
    },
    {
      $unwind: {
        path: '$movie',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio',
        },
        movie: {
          $push: '$movie'
        }
      }
    }
  ])
  promise.then(result => {
    res.json(result)
  }).catch(err => {
    res.json(err)
  })
})






module.exports = router;
