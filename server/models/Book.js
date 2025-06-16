const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        unique: true,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false,
        default: ''
    },
    image: {
        type: String,
        required: false
    },
    donor: {
        type: mongoose.ObjectId,
        ref: 'Donor'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)