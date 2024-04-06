const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  personalInfo: {
    firstName: {
      type: String,
      required: [true, "Please add the first name"],
      validate: {
        validator: (value) => /^[a-zA-Z\s]*$/.test(value),
        message: "First name can only contain letters and spaces",
      },
    },
    lastName: {
      type: String,
      validate: {
        validator: (value) => /^[a-zA-Z\s]*$/.test(value),
        message: "Last name can only contain letters and spaces",
      },
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
      validate: {
        validator: (value) => /^\d{10}$/.test(value),
        message: "Phone number must be a 10-digit number",
      },
    },
    address: { type: String ,
      required: [true, "Please add the address"],
    },
  },
  
  education: [{
    institution: {
      type: String,
      required: [true, "Please add the institution"],
    },
    degree: {
      type: String,
      required: [true, "Please add the degree"],
    },
    graduationYear: {
      type: Number,
      required: [true, "Please add the degree"],
      min: 1900,
      max: new Date().getFullYear(),
    },
  }],
  workExperience: [{
    company: {
      type: String,
      required: [true, "Please add the company"],
    },
    position: {
      type: String,
      required: [true, "Please add the position"],
    },
    startDate: {
      type: Date,
      required: [true, "Please add the start date"],
    },
    endDate: { type: Date },
    responsibilities: { type: String },
  }],
  skills: [{ type: String ,
    required: [true, "Please add the degree"]}],
  projects: [{
    title: {
      type: String,
      required: [true, "Please add the project title"],
    },
    description: { type: String },
    technologies: [{ type: String }],
  }],
 }, 
{
  timestamps: true,
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
