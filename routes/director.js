const mongoose = require('mongoose')
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
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
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
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id.id',
        name: '$_id.name',
        bio: '$_id.bio',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ])
  promise.then(result => {
    res.json(result)
  }).catch(err => {
    res.json(err)
  })
})

// detail director
router.get('/:director_id', (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
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
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id.id',
        name: '$_id.name',
        bio: '$_id.bio',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ])
  promise.then(result => {
    res.json(result)
  }).catch(err => {
    res.json(err)
  })
})

// update
router.put('/:director_id', (req, res, next) => { // testID : 5ebbc1d6b047774a69fc567b
  const promise = Director.findByIdAndUpdate(
    req.params.director_id,
    req.body,
    {
      new: true
    }
  );

  promise.then(director => {
    if (!director) {
      next({ message: 'The director was not found' })
    } else {
      res.json({
        director
      })
    }
  }).catch(e => {
    res.json(e)
  })
})

// delete
router.delete('/:director_id', (req, res) => {
  Director.findByIdAndRemove(req.params.director_id)
    .then(data => {
      let result = data
        ? { data: data, total: Object.values(data).length, status: "ok" }
        : { status: "fail", message: "Sonuc bulunamadı", total: 0 };

      // response
      res.status(200).json({
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})


module.exports = router;
