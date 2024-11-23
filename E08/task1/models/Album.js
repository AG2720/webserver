//Album.js
const mongoose = require('mongoose')

const acceptableGenres = ['Pop', 'Rock', 'Jazz', 'Hip hop', 'Classical', 'R&B', 'Country'];

const albumSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true,
        minlength: [3, 'Artist name must be at least 3 letters long'],
        maxlength: [50, 'Artist name must be shorter that 50 letters'],
    },
    title: {
        type: String,
        required: true,
        minlength: [3, 'Album title must be at least 3 letters long'],
        maxlength: [50, 'Album title must be shorter that 50 letters']
    },
    year: {
        type: Number,
        required: true,
        min: [1900, 'Release year must be after 1900'],
        max: [new Date().getFullYear(), `Release year cannot be in the future`]
    },
    genre: {
        type: String,
    enum: {
        values: acceptableGenres,
        message: 'Genre must be one of: ' + acceptableGenres.join(', ')
        },
    required: true
    },
    tracks: {
        type: Number,
        required: true,
        min: [1, 'Track number must be more than 0'],
        max: [100, 'Track number must not be over 100']
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

albumSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;


