const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,  // Store userId as an ObjectId
            ref: 'User',  // Reference to the Users collection
            required: true,
        },
    },
    { timestamps: true } // Enable automatic createdAt & updatedAt timestamps
);

const Todos = mongoose.model('Todo', todoSchema);

module.exports = { Todos };
