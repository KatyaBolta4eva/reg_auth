const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    fio: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note