const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    task: String
});

module.exports = mongoose.model('Todo', todoSchema);