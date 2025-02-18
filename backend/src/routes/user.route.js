import {Router} from "express";
import { loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router.route("/register").post(upload.single("avatar"), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get( verifyJWT ,logoutUser)
router.route("/profile/update").put(verifyJWT, upload.single("resume") ,updateProfile)


export default router