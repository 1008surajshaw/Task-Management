const express =require("express");
const router =express.Router()

const {
    createAndAssignTask,updateTask,deleteTask, createTaskProgress
} = require("../controllers/Task")
 const {auth} = require("../middlewares/auth")
router.post("/createandassigntask",auth,createAndAssignTask)
router.post("/updatetask",updateTask)
router.delete("/deletetask",deleteTask)

router.post("/taskprogress",auth,createTaskProgress)

module.exports = router
