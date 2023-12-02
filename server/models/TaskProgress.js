const mongoose = require('mongoose');

const taskProgressSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    progressDetails: {
        type: String, // String field to hold progress details or status
    },
    attchedFile:{
        type:String,
    },
    tag: {
		type: [String],
		required: true,
	},
});

module.exports = mongoose.model('TaskProgress', taskProgressSchema);
