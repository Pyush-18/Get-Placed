import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {Company} from "../models/company.model.js"
import { isValidObjectId } from "mongoose";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";

export const registerCompany = asyncHandler(async(req, res) => {
    const {name} = req.body
    if(!name){
        throw new ApiError(404, "Company name is required")
    }

    const existedCompany = await Company.findOne({name})
    if(existedCompany){
        throw new ApiError(404, "Company already exists")
    }

    const company = await Company.create({
        name,
        userId: req.user?._id
    })
    if(!company){
        throw new ApiError(404, "Error while regsitering the company")
    }

    await company.save()

    return res.status(200)
    .json(new ApiResponse(200, company, "Company registered successfully"))
})

export const getCompany = asyncHandler(async(req, res) => {
    const companies = await Company.find({
        userId : req.user?._id
    })
    if(!companies){
        throw new ApiError(404, "Companies not found")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, companies, "Campanies fetched successfully")
    )
})

// get company by id
export const getCompanyById = asyncHandler(async(req, res) => {
    const {companyId} = req.params
    if(!isValidObjectId(companyId)){
        throw new ApiError(404, "Invalid company id")
    }

    const company = await Company.findById(companyId)
    if(!company){
        throw new ApiError(404, "Company not found")
    }

    return res.status(200)
    .json(new ApiResponse(200, company, "Company fetched successfully"))
})

export const updateCompany = asyncHandler(async(req, res) => {
    const {name , description, location, website} = req.body
    const {companyId} = req.params

    //TODO : logo must be there
    let logoPath = null
    if(req.file?.path){
        logoPath = await uploadImageToCloudinary(req.file.path)
    }
    
    if(!isValidObjectId(companyId)){
        throw new ApiError(404, "Invalid company id")
    }

    const updatedCompany = await Company.findByIdAndUpdate(
        companyId,
        {
            $set:{
                name, description, location, website, logo: logoPath?.url
            }
        },
        {new : true}
    )

    if(!updatedCompany){
        throw new ApiError(404, "Error while updating the company details")
    }

    return res.status(200)
    .json(new ApiResponse(200, updatedCompany, "Company updated successfully"))
})