const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie')


router.get('/', (req, res, next) => {
  Movie.find({})
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.post('/store', (req, res, next) => {
  const { title, imdb_score, category, country, year } = req.body;
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
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


module.exports = router;
