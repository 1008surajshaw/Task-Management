const express =require("express");
const router =express.Router()
const {
    createTeam,addMemberToTeam,removeMemberFromTeam,
} = require("../controllers/Team")



const {auth} = require("../middlewares/auth");
const { getallUser, allTask, allTeam } = require("../controllers/Task");

router.post("/createteam" , auth, createTeam)

router.post("/addmember", auth ,addMemberToTeam)

router.post("/removemember",auth ,removeMemberFromTeam)

router.get("/alluser",getallUser)
router.get("/alltask",allTask)
router.get("/allteam",allTeam)

module.exports = router