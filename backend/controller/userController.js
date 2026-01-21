import handleAsyncError from "../middlewares/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import bcryptjs from "bcryptjs";
import { sendToken } from "../utils/jwtToken.js";

export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is temp id",
      url: "This is temp id"
    }
  });

  sendToken(user, 200, res)
});


// LOGIN USER
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

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
