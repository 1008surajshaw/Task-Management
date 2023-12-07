const { default: mongoose } = require('mongoose');
const Team = require('../models/Teams'); // Import Team model
const User = require("../models/User");
const Admin = require('../models/Admin');
exports.createTeam = async (req, res) => {
    try {
        const userId = req.user.id
        const { name } = req.body;
        const admin = await Admin.findById(userId)
        if(!admin){
            return res.status(404).json({ message: 'This route is for admin' });
        }

       console.log(req.body)
        console.log(userId,"create by");
        const uid = new mongoose.Types.ObjectId(userId)
        // Create a new team
        const newTeam = new Team({
            name,
            members: [], 
            tasks: [], 
            createdBy:uid,
           
        });
        

        // Save the new team
        await newTeam.save();

        console.log("ok")
        return res.status(201).json({ message: 'Team created successfully', team: newTeam });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.addMemberToTeam = async (req, res) => {
    try {

        const { teamId, memberId } = req.body;
        const userId = req.user.id; 
        console.log(teamId,"ttt",memberId,"mmm",userId)
        const admin = await Admin.findById(userId)
        console.log(admin)
        if(!admin){
            return res.status(404).json({ message: 'This route is for admin' });
        }
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       

        if (team.members.includes(memberId)) {
            return res.status(400).json({ message: 'User is already a member of the team' });
        }

        team.members.push(memberId);

        
        await team.save();
        await User.findByIdAndUpdate(
            memberId,
            {
                $push: { team: teamId }
            },
            { new: true }
        );

        

        return res.status(200).json({ message: 'Member added to the team successfully', team });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.removeMemberFromTeam = async (req, res) => {
    try {
        const { teamId, memberId } = req.body;
        const userId = req.user.id; 
        console.log("one")
        const admin = await Admin.findById(userId)
        if(!admin){
            return res.status(404).json({ message: 'This route is for admin' });
        }
        console.log(admin)

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!team.members.includes(memberId)) {
            return res.status(400).json({ message: 'User is not a member of the team' });
        }
        console.log("two")
        const memberIndex = team.members.indexOf(memberId);
        if (memberIndex > -1) {
            team.members.splice(memberIndex, 1);
        }

        await team.save();
        await User.findByIdAndUpdate(
            memberId,
            {
                $pull: { team: teamId }
            },
            { new: true }
        );



        // Additional logic if needed (e.g., updating tasks when a member is removed)

        return res.status(200).json({ message: 'Member removed from the team successfully', team });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



