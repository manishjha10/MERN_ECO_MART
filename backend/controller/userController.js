import handleAsyncError from "../middlewares/handleAsyncError.js";
import crypto from 'crypto';
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import bcryptjs from "bcryptjs";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail  } from "../utils/sendEmail.js";
import { v2 as cloudinary } from 'cloudinary'; 





// LOGIN USER
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new HandleError("All fields are required", 400));
  }

  if (!req.files || !req.files.avatar) {
    return next(new HandleError("Avatar is required", 400));
  }

  const avatarFile = req.files.avatar;

  const myCloud = await cloudinary.uploader.upload(
    avatarFile.tempFilePath,
    {
      folder: "avatars",
      width: 150,
      crop: "scale",
    }
  );

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 200, res);
});



export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
 
  console.log("Password received:", password);


  // 1️⃣ Validate input
  if (!email || !password) {
    return next(new HandleError("Email or password cannot be empty", 400));
  }

  // 2️⃣ Find user (IMPORTANT: +password)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new HandleError("Invalid Email or Password", 401));
  }

  // 3️⃣ Compare password
  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) {
    return next(new HandleError("Invalid Email or Password", 401));
  }

 sendToken(user, 200, res)
});


// Logout
export const logout = handleAsyncError(async(req, res, next)=>{
  
  res.cookie('token',null, {
    expires:new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).json({
    success:true ,
    message:"Successfully Logged out"
  })
})

// Forgot  Password 
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandleError("User doesn't exist", 404));
  }

  let resetToken;
  try {
    resetToken = user.generatePasswordResetToken()
    await user.save({ validateBeforeSave: false })
  } catch (error) {
    // console.log(error);
    return next(new HandleError("could not save reset token, please try again later", 500))
  }
  
  const resetPasswordURL =
    `${process.env.FRONTEND_URL}/reset/${resetToken}`; 
  const message = `Use the following link to reset your password: 
  ${resetPasswordURL}. \n\n This link will expire in 30 minutes. \n\n
  If you did't request a password reset, please ignore this message.`;
   
  try
  {
      // send email
      await sendEmail({
        email:user.email,
        subject:'Password Reset Reqest',
        message
      })
      res.status(200).json({
        success: true, 
        message: `Email is send to ${user.email} succesfully`
      })
  }catch(error){
     user.resetPasswordToken=undefined;
     user.resetPasswordExpire=undefined;
    await user.save({ validateBeforeSave: false })
    return next(new HandleError("Email could't be sent , please try again later", 500))
  }
})


//  Reset Password
export const resetPassword = handleAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken, 
    resetPasswordExpire:{$gt:Date.now()}
  })

  if(!user){
    return next(new HandleError("Reset Password token is invalid or has been expired",400))
  }

  const {password, confirmPassword}=req.body;
  if(password !== confirmPassword)
  {
     return next(new HandleError("Password does't match", 400)) 
  }
  user.password=password;
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;
  await user.save(); 
  sendToken(user, 200, res)
}) 


// Get user details 
export const getUserDetails=handleAsyncError(async(req, res, next)=>{
     const user=await User.findById(req.user.id)
     res.status(200).json({
       success:true,
       user
     })
})


// update the password 
export const updatePassword=handleAsyncError(async(req, res, next)=>{
  const {oldPassword, newPassword, confirmPassword}=req.body; 
  const user=await User.findById(req.user.id).select(`+password`);
  const checkPasswordMatch=await user.verifyPassword(oldPassword);
  if(!checkPasswordMatch)
  {
    return next(new HandleError('Old password is incorrect', 400))
  }
  if (newPassword.trim() !== confirmPassword.trim()) {
    return next(new HandleError("Password doesnt match", 400));
  }

  user.password=newPassword;
  await user.save();
  sendToken(user, 200, res); 
})

// update User Profile
// export const updateProfile = handleAsyncError(async (req, res, next) => {
//     const {name, email}=req.body;
//     const updateUserDetails={
//       name,
//       email
//     }
//     const user = await User.findByIdAndUpdate(req.user.id, updateUserDetails, {
//       new:true, 
//       runValidators:true
//     })
//     res.status(200).json({
//       success:true, 
//       message:"Profie Updated Successfuly",
//       user
//     })
    
// }) 


export const updateProfile = handleAsyncError(async (req, res, next) => {
  const { name, email} = req.body;

  const newUserData = {
    name,
    email,
  }; 

  const user = await User.findById(req.user.id);

  // ✅ If new avatar is uploaded
  if (req.files && req.files.avatar) {
    // Remove old avatar
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Upload new avatar (invalidate cache)
    const result = await cloudinary.uploader.upload(
      req.files.avatar.tempFilePath,
      {
        folder: "avatars",
        width: 150,
        crop: "scale",
        invalidate: true, // ✅ force CDN refresh
      }
    );

    // Save avatar with version (VERY IMPORTANT)
    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
      version: result.version, // this changes on every upload
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    newUserData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user: updatedUser,
  });
});




// Admin - Getting user information 
export const getUserList = handleAsyncError(async(req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
      success:true, 
      users
    })
})

// Admin Getting single user information 
export const getSingleUser = handleAsyncError(async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if(!user)
   {
     return next(new HandleError(`User does'nt exist with the id: ${req.params.id},400`))
   }
   res.status(200).json({
    success:true, 
    user
   })
}) 

// Admin- Changing user role
export const updateUserRole = handleAsyncError(async (req, res, next) => {
  const { role } = req.body;
  console.log("ROLE FROM TOKEN:", req.user.role);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    {
      new: true,
      runValidators: true
    }
  );

  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }

  res.status(200).json({
    success: true,
    user
  });
});


// Admin - Delete User Profile
export const deleteUser = handleAsyncError(async (req, res, next) => {
      const user = await User.findById(req.params.id);
      if(!user)
      {
        return next(new HandleError("User does'nt exist", 400))
      } 
      const imageId = user.avatar.public_id; 
      await cloudinary.uploader.destroy(imageId); 

      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true, 
        message:"User Deleted Successfully"
      })
});


