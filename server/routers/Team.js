const express =require("express");
const router =express.Router()
const {
    createTeam,addMemberToTeam,removeMemberFromTeam
} = require("../controllers/Team")

const {auth} = require("../middlewares/auth")

router.post("/createteam" , auth, createTeam)

router.post("/addmember", auth ,addMemberToTeam)

router.post("/removemember",auth ,removeMemberFromTeam)

module.exports = router