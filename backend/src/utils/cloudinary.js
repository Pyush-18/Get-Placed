import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadPdfToCloudinary = async (localFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  if (!localFilePath) return null;
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      asset_folder: "job Hunt",
      resource_type: "auto",
      format: "pdf", 
      use_filename: true, 
      unique_filename: false,
    });
    if (response) {
      fs.unlinkSync(localFilePath);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return error;
  }
};

export const uploadImageToCloudinary = async (localFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  if (!localFilePath) return null;
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      asset_folder: "job Hunt",
      resource_type: "auto",
      use_filename: true, 
      unique_filename: false,
    });
    if (response) {
      fs.unlinkSync(localFilePath);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return error;
  }
};
