const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: String,
    traks: Number
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;


