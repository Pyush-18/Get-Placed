import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    requirements: [{
      type: String,
      required: true,
      trim: true
    }],
    salary: {
      type: Number,
      required: true,
    },
    jobType: {
        type: String,
        required: true,
        enum: ["Full-time" ,"Part-time", "Internship"]
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    noOfOpening: {
        type: Number,
        required: true
    },
    exprience:{
      type: Number,
      required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    application:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        }
    ]

  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema)