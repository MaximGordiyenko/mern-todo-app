const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    text: {
        type: String
    },
    user_id: {
        type: String
    },
    create_data: {
        type: String
    },
    completed: {
        type: Boolean
    },
});

module.exports = mongoose.model('Todo', Todo);