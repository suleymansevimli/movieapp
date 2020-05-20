const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DirectorSchema = new Schema({
    name: {
        type: String,
        required: [true, '{PATH} alanı zorunludur. '],
        maxlength: [15, '{PATH}  alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır. '],
        minlength: [2, '{PATH}  alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır. ']
    },
    surname: {
        type: String,
        required: [true, '{PATH} alanı zorunludur. '],
        maxlength: [15, '{PATH}  alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır. '],
        minlength: [3, '{PATH}  alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır. ']
    },
    bio: {
        type: String,
        required: [true, '{PATH} alanı zorunludur. '],
        maxlength: [30, '{PATH}  alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır. '],
        minlength: [3, '{PATH}  alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır. ']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);