const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        default: 'admin'
      },

    password: {
        type: String,
        required: true,
    },
    // Additional fields related to admin details, if needed

    assignedTasks: [
        {
            task: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task', // Reference to the Task model
            },
            assignedTo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to the User model
            },
            // Any additional fields related to the assignment, such as status, notes, etc.
        },
    ],
    assignedTeam :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Team" 
        }
    ],
    submittedTask :[
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: "TaskProgress",
        }
    ],
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    
});

module.exports = mongoose.model('Admin', adminSchema);
