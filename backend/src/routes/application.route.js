import {Router} from "express"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/apply/:jobId").get(verifyJWT, applyJob)
router.route("/get").get(verifyJWT, getAppliedJobs)
router.route("/applicants/:jobId").get(verifyJWT, getApplicants)
router.route("/update/:applicationId").put(verifyJWT, updateStatus)

export default router