import { isValidObjectId } from "mongoose";
import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

//ADMIN
export const postJob = asyncHandler(async(req, res) => {
    const {title, description, requirements, salary, jobType, location, noOfOpening, companyId, exprience} = req.body
    if(!isValidObjectId(companyId)){
        throw new ApiError(400, "Invalid company id")
    }
    if([title, description, requirements, jobType, location].some((field) => field?.trim() === "") || [salary, noOfOpening, exprience].some((field) => field === null)){
        throw new ApiError(400, "Some fields are missing")
    }


    const validJobTypes = ["Full-time" ,"Part-time", "Internship"]
    if(!validJobTypes.includes(jobType)){
        throw new ApiError(400, "Job type must be one of them (Full-time, Part-time, Internship)");
    }

    if(isNaN(Number(exprience)) || Number(exprience) < 0){
        throw new ApiError(400, "Experience must be a valid non-negative number");
    }
    

    const job = await Job.create({
        title, 
        description,
        requirements : requirements?.trim(),
        salary: Number(salary),
        location,
        noOfOpening,
        jobType,
        exprience,
        createdBy: req.user?._id,
        company: companyId
    })
    if(!job){
        throw new ApiError(404, "Error while creating the job")
    }

    await job.save()

    return res.status(200)
    .json(new ApiResponse(200, job, "Job post created successfully"))

})

// USER
export const getAllJobs = asyncHandler(async(req, res) => {
    const keyword = req.query.keyword || ""
    const query = {
        $or:[
            {title: {$regex : keyword, $options: "i"}},
            {description: {$regex : keyword, $options: "i"}}, 
        ]
    }
    const job = await Job.find(query).populate({
        path: "company"
    })
    if(!job){
        throw new ApiError(400, "Job not found")
    }

    return res.status(200)
    .json(new ApiResponse(200, job, "Job fetched successfully"))
})

//USER
export const getJobById = asyncHandler(async(req, res) => {
    const {jobId} = req.params
    if(!isValidObjectId(jobId)){
        throw new ApiError(400, "Invlalid job id")
    }

    const job = await Job.findById(jobId).populate({
        path: "application"
    })
    .populate({path: "company"})

    if(!job){
        throw new ApiError(400, "Job not found")
    }
    return res.status(200)
    .json(new ApiResponse(200, job, "Job fetched successfully"))
})

//ADMIN : jobs which were build by admin
export const getAdminJobs = asyncHandler(async(req,res) => {
    const authUserId = req.user?._id
    if(!isValidObjectId(authUserId)){
        throw new ApiError(404, "Invalid auth user id")
    }

    const adminJobs = await Job.find({createdBy : authUserId}).populate("company")
    if(!adminJobs){
        throw new ApiError(400, "Jobs not found")
    }

    return res.status(200)
    .json(new ApiResponse(200, adminJobs, "Admin jobs fetched successfully"))
})
