const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is reqired'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User