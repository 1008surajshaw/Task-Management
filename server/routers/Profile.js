const {auth} = require("../middlewares/auth")

const {deleteAccount,updateProfile,getAllUserDeatails,updateDisplayPicture,getAssignTask} = require("../controllers/Profile")
const router = require("./User")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth, deleteAccount)
router.put("/updateProfile",auth,  updateProfile)
router.get("/getUserDetails",auth,  getAllUserDeatails)

router.put("/updateDisplayPicture",auth,  updateDisplayPicture)

module.exports = router