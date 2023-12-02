const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        },
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task', // Reference to the Task model
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    // Any additional fields related to the team
});

module.exports = mongoose.model('Team', teamSchema);
