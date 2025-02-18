import { isValidObjectId } from "mongoose";
import {Application} from "../models/application.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Job } from "../models/job.model.js";

export const applyJob = asyncHandler(async(req, res) => {
    const userId = req.user?._id
    const {jobId} = req.params
    if(!jobId){
        throw new ApiError(400, "Job is invalid")
    }
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid request")
    }

    const job = await Job.findById(jobId)
    if(!job){
        throw new ApiError(400, "Job not found")
    }

    const existingApplication = await Application.findOne({
        $or:[{jobId, userId}]
    })

    if(existingApplication){
        throw new ApiError("You have already applied to this job")
    }

    const newApplication = await Application.create({
        job: jobId,
        applicants: userId
    })
    job.application.push(newApplication?._id)

    if(!newApplication){
        throw new ApiError(400, "Error while creating new application")
    }
    await job.save({validateBeforeSave: false})

    return res.status(200)
    .json(new ApiResponse(200, newApplication, "Job applied successfully"))

})

export const getAppliedJobs = asyncHandler(async(req, res) => {
    const userId = req.user?._id
    const application = await Application.find({applicants: userId}).sort({createdAt: -1}).populate({
        path: "job",
        options: {sort:{createdAt: -1}},
        populate:{
            path: "company",
            options: {sort:{createdAt: -1}},
        }
    })
    if(!application){
        throw new ApiError(400, "Applications not found")
    }

    return res.status(200)
    .json(new ApiResponse(200, application, "Application fetched successfully"))
})

export const getApplicants = asyncHandler(async(req,res) => {
    const {jobId} = req.params
    if(!jobId){
        throw new ApiError(400, "job not found")
    }
    const job = await Job.findById(jobId).populate({
        path: "application",
        options: {sort:{createdAt: -1}},
        populate:{
            path: "applicants"
        }
    })
    if(!job){
        throw new ApiError(400, "job not found")
    }
    
    return res.status(200)
    .json(new ApiResponse(200, job, "job applicants fetched successfully"))

})

export const updateStatus = asyncHandler(async(req, res) => {
    const {status} = req.body
    const {applicationId} = req.params
    if(!isValidObjectId(applicationId)){
        throw new ApiError(400, "Invalid application id")
    }
    const validStatus = ["pending", "accepted", "rejected"]
    if(!validStatus.includes(status?.toLowerCase())){
        throw new ApiError(400, "status is required")
    }

    const application = await Application.findByIdAndUpdate(
        applicationId,
        {
            $set:{
                status: status?.toLowerCase()
            }
        },
        {
            new : true
        }
    )
    if(!application){
        throw new ApiError(400, "Error while fetching the application")
    }

    return res.status(200)
    .json(new ApiResponse(200, application, "Application fetched successfully"))
    
})