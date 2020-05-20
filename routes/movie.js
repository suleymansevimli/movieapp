const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie')


router.get('/', (req, res, next) => {
  Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: '$director'
    }
  ])
    .then(data =>
      res.status(200).json(data)
    )
    .catch(err =>
      res.status(500).json(err)
    )
});

router.post('/store', (req, res, next) => {
  const { title, imdb_score, category, country, year, director_id } = req.body;
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year,
    director_id: director_id
  })

  movie.save()
    .then(data => {
      res.status(201).json({
        status: true,
        data
      })
    }).catch(err => {
      res.status(500).json({
        err
      })
    })
})


router.get('/top5', (req, res) => { // testID : 5ebbc1d6b047774a69fc567b
  Movie.find({}).limit(5).sort({ imdb_score: -1 })
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

router.get('/:movie_id', (req, res) => { // testID : 5ebbc1d6b047774a69fc567b
  Movie.findById(req.params.movie_id)
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

router.get('/:movie_id', (req, res) => { // testID : 5ebbc1d6b047774a69fc567b
  Movie.findById(req.params.movie_id)
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


router.put('/:movie_id', (req, res) => { // testID : 5ebbc1d6b047774a69fc567b
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new: true
    }
  );

  promise.then(movie => {
    if (!movie) {
      res.json({
        message: "yok"
      })
    } else {
      res.json({
        movie
      })
    }
  }).catch(e => {
    res.json(e)
  })
})



router.delete('/:movie_id', (req, res) => {
  Movie.findByIdAndRemove(req.params.movie_id)
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

// between date
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const { start_year, end_year } = req.params
  Movie.find({
    year: {
      "$gte": parseInt(start_year),
      "$lte": parseInt(end_year)
    }
  })
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;
