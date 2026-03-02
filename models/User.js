const mongoose = require('mongoose')
const validator = require('validator').default

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address'
        }
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User