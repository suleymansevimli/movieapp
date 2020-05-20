const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
    director_id: {
        type: Schema.Types.ObjectId,

    },
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunludur. '],
        maxlength: [15, '{PATH}  alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır. '],
        minlength: [3, '{PATH}  alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır. ']
    },
    category: {
        type: String,
        minlength: [3, 'kategori alanı minimum {MINLENGTH} karakter olabilir.'],
        maxlength: 30
    },
    country: {
        type: String,
        minlength: [3, 'kategori alanı minimum {MINLENGTH} karakter olabilir.'],
        maxlength: 30
    },
    year: {
        type: Number,
        min: 1970,
        max: 2025
    },
    imdb_score: {
        type: Number,
        min: 0,
        max: 10
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movies', MovieSchema);