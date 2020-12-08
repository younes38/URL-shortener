const mongoose = require('mongoose');
const shortId = require('shortid')

const shortURLschema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate(),
        unique: true
    },
    clicks: {
        type: Number,
        default: 0,
        required: true
    }
})

module.exports = mongoose.model('ShortURL', shortURLschema);