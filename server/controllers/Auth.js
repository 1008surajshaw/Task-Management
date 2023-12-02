const User = require("../models/User")
const OTP = require("../models/OTP")
const Admin = require("../models/Admin")
const otpGenerator =require("otp-generator");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
require("dotenv").config();
const mailSender =require("../utils/mailSender");
const { passwordUpdated } =require("../mail/passwordUpdate");
const Profile = require("../models/Profile")


exports.sendotp =async (req,res) =>{
    try{
     const { email } =req.body;
     const cheackUserPresent =await User.findOne({ email });
 
     if(cheackUserPresent){
         return res.status(401).json({
             sucsess:false,
             message:'user already registered'
         })
     }
 
     var otp =otpGenerator.generate(6,{
         upperCaseAlphabets:false,
         lowerCaseAlphabets:false,
         specialChars:false,
     });
 
     console.log("OTP generator:",otp);
 
     //check unique otp or not
 
     let result =await OTP.findOne({ otp:otp });
     console.log("Result is Generate OTP Func");
     console.log("OTP", otp);
     console.log("Result", result);
     while(result){
         otp =otpGenerator.generate(6,{
             upperCaseAlphabets:false,
             lowerCaseAlphabets:false,
             specialChars:false,
         });
     //    result =await OTP.findOne({otp:otp});
  
     }
 
      const otpPayload ={ email,otp };
      const otpBody =await OTP.create(otpPayload);
      console.log(otpBody);
 
      res.status(200).json({
         success:true,
         messaga:"otp sent successfully",
         otp,
      })
 
 
    }
    catch(error){
    console.log(error);
    console.log("come in catch bolock in sendotp ");
     return res.status(500).json({
     success:false,
     message:error.message,
     
 })
    }
 }

 
exports.signup =async (req,res) =>{

    //data fetch from request ki body
  try{
    const {
        username,
        email,
        password,
        confirmPassword,
        otp,

    } =req.body;

    

    if(!username ||!email || !password || !confirmPassword|| !otp){
        return res.status(403).json({
            success:false,
            message:"all fields are required",
        });

    }
    
    if(password !==confirmPassword){
        return res.status(400).json({
    success:false,
    message:"password and confirm password value are not same"
});
}

   
    const existingUser =await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'user is already register',
        });
    }
    console.log(email)
    //find most resent otp stored for the user
    const response =await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("1");
    console.log(response);
    console.log("2");

    if(response.length === 0){
        return res.status(400).json({
            success:false,
            message:"otp not found",
        })
    }
    else if(otp !== response[0].otp){
        return res.status(400).json({
            success:false,
            messaga:"invalid otp",
        })
    }
    //validate otp

    //hash password

    const hashedPassword =await bcrypt.hash(password,10);
    //enter create in db
    const profileDetails =await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })


    const user =await User.create({
        username,
        email,
        password:hashedPassword,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${username} ${username}`,
    })
    
    return res.status(200).json({
        success:true,
        message:'user is register successfully',
        user,
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        messaga:'user cannot registered. sign in me catch me aa gya'
    })
  }
}



exports.login =async (req,res)=>{
    try{
    //get data from req body

    const { email,password }=req.body;
    //validition data
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'all fields are required,please try again'
        });
    }
    
    const user = await User.findOne({ email }).populate("additionalDetails");
    let userData;

    if (!user) {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({
          success: false,
          message: 'User or Admin not found for the given email.',
        });
      }

      // Handle admin login logic here
      // Example: Check admin password and generate token
      userData = admin;
    } else {
      // Handle user login logic here
      // Example: Check user password and generate token
      userData = user;
    }
    
   
    console.log("user", userData);

    if (await bcrypt.compare(password, userData.password)) {
      const token = jwt.sign(
        {
          email: userData.email,
          id: userData._id,
          accountType: userData.accountType,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      userData.token = token;
      userData.password = undefined;

    //create cookies and send response
  const options ={
    expires: new Date(Date.now()+3 * 24 * 60 * 60 * 1000),
    httpOnly:true,
  }
    res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user:userData,
        messaga:'loged in successfully'
    });

   }
   else{
    return res.status(401).json({
        success:false,
        message:'password is incorrect',
    });
   }

    }
    catch(error){
     console.log(error)
     return res.status(500).json({
        success:false,
        message:'login failure, come in catch block in log in time'
     })
    }
}


exports.changePassword =async (req,res) =>{
    try{
        //get DATA from req ,body
      const userId = await User.findById(req.user.id);
        console.log(userId)
       
        const { oldPassword,password } =req.body;
        console.log("9")
        
       
        const isPasswordMatch =await bcrypt.compare(oldPassword,userId.password);
        console.log("isPasswordMatch:", isPasswordMatch);
        if(!isPasswordMatch){
          return res.status(401).json({
            success:false,
            message:'password error'
            
          })
        }
      const encryptredPassword = await bcrypt.hash(password,10);
      console.log("1")
    
        const updatedUserDetails =  await User.findByIdAndUpdate(
           req.user.id,
            {password:encryptredPassword},
            {new:true},
         ).populate("additionalDetails");
         console.log("1")
        try{
         const emailResponse =await mailSender(
                updatedUserDetails.email,
                "password update Confirmation",
                passwordUpdated(
  
                  updatedUserDetails.email,
                  `Password updated successfully for ${updatedUserDetails.username}`
              )
         );
         console.log("Email sent successfully:", emailResponse.response);
  
        }
        catch(error){
           // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
              console.error("Error occurred while sending email:", error);
              return res.status(500).json({
                  success: false,
                  message: "Error occurred while sending email",
                  error: error.message,
              }); 
        }
        return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    }
    catch(error){
  // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
  console.error("Error occurred while updating password:", error);
  return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
  });
    }
      }
  
exports.adminSign = async (req,res) =>{
    try{
        console.log(req.body);
        const { username, email, password, confirmPassword} = req.body;
        
        if(!username ||!email || !password || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:"all fields are required",
            });
    
        }
        if(password !==confirmPassword){
            return res.status(400).json({
        success:false,
        message:"password and confirm password value are not same"
    });
    }
    const existingUser =await Admin.findOne({ email });
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'user is already register',
        });
    }

    const hashedPassword =await bcrypt.hash(password,10);
    const admin =await Admin.create({
        username,
        email,
        password:hashedPassword
    })
    return res.status(200).json({
        success:true,
        message:'user is register successfully',
        admin,
    })
    }
    catch(error){
        console.log(error);
    return res.status(500).json({
        success:false,
        messaga:'user cannot registered. sign in me catch me aa gya'
    })
    }
}