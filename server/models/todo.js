const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
    userId: {
        type: String,
        default: this._id
    },
    username: {
        type: String,
   
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    list: {
        type: String
    }
})

module.exports = mongoose.model('ToDo', todoSchema)

