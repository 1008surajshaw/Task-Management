const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            trim:true,
        },
        email: {
			type: String,
			required: true,
			trim: true,
		},
        password: {
			type: String,
			required: true,
		},
        task :[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Task",
        },
        ],
        token :{
            type: String,
        },
        resetPasswordExpires: {
			type: Date,
		},
        image: {
			type: String,
			required: true,
		},
        taskProgress :[
            {
                type:  mongoose.Schema.Types.ObjectId,
                ref: "TaskProgress",
            }
        ],
        team:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Team"
                
            }
        ],
        additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},

    },
    { timestamps: true }

)
 module.exports = mongoose.model("user",userSchema);