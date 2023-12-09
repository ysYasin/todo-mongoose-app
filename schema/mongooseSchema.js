const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now
    }
})
// instence methods
todoSchema.methods = {
    findActive: function (key) {
        return mongoose.model("Todo").find({ title: new RegExp(key, 'i') })// search by key words in title
    }
}
// static method
todoSchema.statics = {
    getByKey: function (key) {
        return this.find({ title: new RegExp(key, 'i') }, { description: new RegExp(key, 'i') })// search by key words in title
    }
}
// query methods
todoSchema.query = {
    getActive: function (key) {
        return this.find({ title: new RegExp(key, 'i') })// search by key words in title
    }
}

module.exports = todoSchema;