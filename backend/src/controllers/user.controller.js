import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadImageToCloudinary, uploadPdfToCloudinary } from "../utils/cloudinary.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phoneNumber, role } = req.body;
  if (
    [fullName, email, password, phoneNumber, role].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(404, "All fields are required");
  }
  let avatarPath = null
  if(req.file?.path){
    avatarPath = await uploadImageToCloudinary(req.file.path)
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(404, "User already exists");
  }

  const user = await User.create({
    fullName: fullName?.trim(),
    email: email?.trim(),
    password,
    phoneNumber,
    role ,
    "profile.avatar": avatarPath?.url  
  });
  if (!user) {
    throw new ApiError(404, "There is an issue while creating user");
  }

  await user.save();

  const registeredUser = await User.findById(user?._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, registeredUser, "User registered successfully"));
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
};

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if ([email, password, role].some((fields) => fields?.trim() === "")) {
    throw new ApiError(404, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    throw new ApiError(404, "User doesn't exists with this email");
  }

  const isPasswordMatched = await existedUser.isPasswordCorrect(password);
  if (!isPasswordMatched) {
    throw new ApiError(404, "Invalid password");
  }

  if (role !== existedUser.role) {
    throw new ApiError(404, "account doesn't exists with this role");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser?._id
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  const loggedInUser = await User.findById(existedUser?._id).select(
    "-password"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phoneNumber, bio, skills } = req.body;
  const skillArray = skills
    ? skills.split(",").map((skill) => skill.trim())
    : [];

  let resumeLocalPath = null;
  if (req.file?.path) {
    resumeLocalPath = await uploadPdfToCloudinary(req.file.path);
  }
   
  const updateData = {
    $set: {
      fullName,
      email,
      phoneNumber,
      "profile.bio": bio,
      "profile.resumeOriginalName": resumeLocalPath?.display_name,
    },
  };
  if (resumeLocalPath?.url) {
    updateData.$set["profile.resume"] = resumeLocalPath.url;
  }

  if (skillArray.length >= 0) {
    updateData.$push = {
      "profile.skills": {
        $each: skillArray,
      },
    };
  }

  const user = await User.findByIdAndUpdate(req.user?._id, updateData, {
    new: true,
  }).select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully"));
});
