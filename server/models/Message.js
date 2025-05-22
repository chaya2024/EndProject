const mongoose = require('mongoose')
const Subject = {
    Donations: "תרומות",
    Comments: "הערות",
    Questions: "שאלות",
    Suggestions: "הצעות",
    Others: "אחר"
};
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        enum: Object.values(Subject),
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    numberPhone: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
})
module.exports = mongoose.model('Message', messageSchema)