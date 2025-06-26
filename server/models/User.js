const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ['Rav', 'Gabay'],
        default: 'Gabay'
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
    }
})
module.exports = mongoose.model('User', UserSchema)