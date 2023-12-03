const Task = require('../models/Tasks'); 
const User = require("../models/User"); 
const Team = require('../models/Teams'); 
const mongoose = require('mongoose');
const {uploadFileToCloudinary, uploadImageToCloudinary} = require("../utils/imageUploder")
const TaskProgress = require("../models/TaskProgress")

// Controller function to create a task and assign it
exports.createAndAssignTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignedToUser, assignedToTeam } = req.body;
        
        // Create a new task
        const newTask = new Task({
            title,
            description,
            dueDate,

        });

        // Check if the task should be assigned to a user
        if (assignedToUser) {
            const user = await User.findById(assignedToUser);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            newTask.assignedTo = assignedToUser;
        }

        // Check if the task should be assigned to a team
        if (assignedToTeam) {
            const team = await Team.findById(assignedToTeam);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            newTask.team = assignedToTeam;
        }
        console.log(assignedToTeam,"team");
        console.log(assignedToUser,"user")
        // Save the new task
        console.log(newTask,"newTask")
        await newTask.save();
       const uid = new mongoose.Types.ObjectId(newTask._id)
       console.log(uid,"uid ha bahi")

        // Update assignedTasks for user or team if task was assigned
        if (assignedToUser !== null) {
            const user = await User.findByIdAndUpdate(
                assignedToUser,  // Corrected: Provide the ID directly
                {
                    $push: {
                        task: uid
                    },
                },
                { new: true }
            );
            console.log(user, "ooooooooooooo");
        }
        
        if (assignedToTeam !== "") {
            const team = await Team.findByIdAndUpdate(
                assignedToTeam,  // Corrected: Provide the ID directly
                {
                    $push: {
                        tasks: uid
                    }
                },
                { new: true }
            );
            console.log("run hua");
        }

         return res.status(201).json({ message: 'Task created and assigned successfully', newTask });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id; // Assuming the task ID is passed in the URL params
        const { title, description, dueDate, assignedToUser, assignedToTeam } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task properties if new values are provided in the request body
        if (title) {
            task.title = title;
        }
        if (description) {
            task.description = description;
        }
        if (dueDate) {
            task.dueDate = dueDate;
        }

        // Reassign the task to another user, if provided
        if (assignedToUser) {
            const user = await User.findById(assignedToUser);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            task.assignedTo = assignedToUser;
        }

        // Reassign the task to another team, if provided
        if (assignedToTeam) {
            const team = await Team.findById(assignedToTeam);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            task.team = assignedToTeam;
        }

        await task.save();

        return res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; // Assuming the task ID is passed in the URL params

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.remove();

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getAllTasksWithAssignees = async (req, res) => {
    try {
        const tasks = await Task.find({},{
                                         title:true,
                                         description:true,
                                         dueDate:true,                                                       
                                        })
                                        .populate('assignedTo')
                                        .populate('team')
                                        .exec()

        // tasks will contain all tasks along with assigned user/team information
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


// task progress
exports.createTaskProgress = async (req, res) => {
    try {
        console.log("one")
      
        const userId = req.user.id
        const {taskId, progressDetails,tag: _tag} = req.body;
      //  console.log(req.body);

        const attachedFile = req.files.assignImage;
       console.log(req.files)
        //console.log(attachedFile,"attachedFile");
        const tag = JSON.parse(_tag);

        // Check if essential fields are present
        if (!taskId || !userId || !progressDetails || !attachedFile) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are Mandatory',
            });
        }

        // Fetch user details including teams and tasks
        const user = await User.findById(userId).populate('team').populate('task');
        console.log(user,"userId ha baionrckgnl");
        
        // Verify if the provided taskId matches any of the user's tasks or team's tasks
        // if (!user.team.tasks.find((t) => t._id === taskId) || !user.task._id === taskId) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Task not associated with the user or team',
        //     });
        // }

        // Upload file to Cloudinary
        const assign = await uploadImageToCloudinary(attachedFile, process.env.FOLDER_NAME);
        console.log(assign ,"asign valur ha l=kya")
        // Create new TaskProgress
        const newProgress = await TaskProgress.create({
            taskId,
            userId,
            progressDetails,
            attchedFile: assign.secure_url,
            tag,
        });

        // Update Task with the new TaskProgress
        await Task.findByIdAndUpdate(
            { _id: taskId },
            {
                $push: {
                    assignment: newProgress._id,

                },
                $set :{
                    completed: true,
                }

            },
            { new: true }
        );
        


        return res.status(201).json({ message: 'TaskProgress created successfully', taskProgress: newProgress });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getTaskForUser = async (req,res) =>{
    try{
       const userId = req.user.id
       const user = await User.findById(userId)
                              .populate("taskProgress")
                              .populate("team")
                              .populate("task")
        console.log(user)
        const teamTasks = [];
        user.team.forEach((team) => {
          // Check if tasks are properly populated in each team
         
          console.log(team.tasks);
          teamTasks[team._id] = team.tasks;
        });
        
        const task = user.task
       

        console.log(teamTasks , "tam task",task)
        return res.json({
            success:true,
            task,
            teamTasks
           
        })
    }
    catch(error){

    }
}