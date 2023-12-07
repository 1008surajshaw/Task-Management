const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")

const {deleteAccount,updateProfile,getAllUserDeatails,updateDisplayPicture,getAssignTask} = require("../controllers/Profile")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth, deleteAccount)
router.put("/updateProfile",auth,  updateProfile)
router.get("/getUserDetails",auth,  getAllUserDeatails)

router.put("/updateDisplayPicture",auth,  updateDisplayPicture)
// router.get("/assigntask",auth,getAssignTask)
module.exports = router