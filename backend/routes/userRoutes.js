import express from 'express'; 
import { logout, loginUser, registerUser, requestPasswordReset, resetPassword, getUserDetails, updatePassword, updateProfile, getUserList, getSingleUser, updateUserRole, deleteUser } from '../controller/userController.js';
import { roleBasedAccess, verifyUserAuth } from '../middlewares/userAuth.js';

// import { upload } from "../middlewares/multer.js";

const router = express.Router();

// router.route("/register").post(upload.single("avatar"), registerUser);



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logout)


router.route("/password/forgot").post(requestPasswordReset)
router.route("/reset/:token").post(resetPassword)


router.route("/profile").get(verifyUserAuth, getUserDetails)
router.route("/password/update").put(verifyUserAuth, updatePassword)
router.route("/profile/update").put(verifyUserAuth, updateProfile)

router.route("/admin/users").get(verifyUserAuth,roleBasedAccess("admin"), getUserList)
router.route("/admin/user/:id").get(verifyUserAuth, roleBasedAccess("admin"), getSingleUser)
// router.route("/admin/user/:id").get(verifyUserAuth, roleBasedAccess("admin"), getSingleUser)
.put(verifyUserAuth, roleBasedAccess('admin'), updateUserRole)
.delete(verifyUserAuth, roleBasedAccess('admin'), deleteUser)

export default router;
