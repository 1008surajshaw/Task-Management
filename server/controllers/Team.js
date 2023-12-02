const Team = require('../models/Teams'); // Import Team model
const User = require("../models/User")
exports.createTeam = async (req, res) => {
    try {
        const { name } = req.body;

        const { createdBy } = req.user.id;
        console.log(createdBy,"create by");

        // Create a new team
        const newTeam = new Team({
            name,
            members: [], 
            tasks: [], 
             createdBy,
           
        });

        // Save the new team
        await newTeam.save();

        return res.status(201).json({ message: 'Team created successfully', team: newTeam });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.addMemberToTeam = async (req, res) => {
    try {
        const { teamId, memberId } = req.body;
        const userId = req.user._id; 

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify if the authenticated user is the creator of the team
        if (String(team.createdBy) !== String(userId)) {
            return res.status(403).json({ message: 'Only the team creator can add members' });
        }

        if (team.members.includes(memberId)) {
            return res.status(400).json({ message: 'User is already a member of the team' });
        }

        team.members.push(memberId);
        await team.save();

        

        return res.status(200).json({ message: 'Member added to the team successfully', team });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.removeMemberFromTeam = async (req, res) => {
    try {
        const { teamId, memberId } = req.body;
        const userId = req.user._id; 

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const user = await User.findById(memberId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify if the authenticated user is the creator of the team
        if (String(team.createdBy) !== String(userId)) {
            return res.status(403).json({ message: 'Only the team creator can remove members' });
        }

        if (!team.members.includes(memberId)) {
            return res.status(400).json({ message: 'User is not a member of the team' });
        }

        const memberIndex = team.members.indexOf(memberId);
        if (memberIndex > -1) {
            team.members.splice(memberIndex, 1);
        }

        await team.save();

        // Additional logic if needed (e.g., updating tasks when a member is removed)

        return res.status(200).json({ message: 'Member removed from the team successfully', team });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



