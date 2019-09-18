const mongoose = require('mongoose')

const memberSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }


})

module.exports = Member = mongoose.model("member", memberSchema )