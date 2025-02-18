import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
const router = Router()

router.route("/post").post(verifyJWT,postJob)
router.route("/get-all").get(verifyJWT,getAllJobs)
router.route("/get/:jobId").get(verifyJWT,getJobById)
router.route("/admin").get(verifyJWT,getAdminJobs)

export default router