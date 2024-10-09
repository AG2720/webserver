const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name'],
    },
    lastName: {
        type: String,
        reqired: [true, 'Please provide a last name'],
    },
});

module.exports = mongoose.model('Name', nameSchema)