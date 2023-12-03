const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team', 
    },
    completed: {
        type: Boolean,
        default: false,
    },
    assignment :{
        type :mongoose.Schema.Types.ObjectId,
        ref: "TaskProgress"
    },
    file:{
        type: String,
    },
    
   
});

module.exports = mongoose.model('Task', taskSchema);
