const User = require("../models/User")
const Profile = require("../models/Profile")
const { uploadImageToCloudinary } = require("../utils/imageUploder");
const TaskProgress = require("../models/TaskProgress")
const Task = require("../models/Tasks")
const mongoose = require("mongoose")

exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber,gender="" } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);
    
		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
    profile.gender = gender
    
		// Save the updated profile
		await profile.save();
   
    const updatedUser = await User.findById(id).populate("additionalDetails")

		return res.json({
			success: true,
			message: "Profile updated successfully",
			updatedUser,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDeatails =async (req,res) =>{
  try{
     const id = req.user.id;
     const userDetails =await User.findById(id).populate("additionalDetails").exec();
     console.log(userDetails);
      res.status(200).json({
      success:true,
      message:"user details fetched succesfully",
      data: userDetails,
     });

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"come in catch block in profile"
  });
  }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    console.log("hello")
    const displayPicture = req.files.displayPicture
    console.log("1")
    const userId = req.user.id
    console.log("1")
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    ).populate("additionalDetails")
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.getAssignTasks = async (req,res) =>{
    try{
        const userId = req.user.id;
        let userDetails = await User.findById(userId)
                            .populate("taskProgress")
                            .populate({path:"team",
                              populate :{

                            }})
    }
    catch(error){

    }

}



