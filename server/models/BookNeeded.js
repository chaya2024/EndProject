const mongoose = require('mongoose')

const bookNeddedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('BookNeeded', bookNeddedSchema)