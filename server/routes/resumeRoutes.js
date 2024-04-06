const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Resume = require("../models/resumeSchema");
const authenticate = require("../middleware/authenticate");


//@description GET ALL Resumes
//@route Get/api/resumes
//@access private
router.get("/resumes", authenticate, asyncHandler(async (req, res) => {
    const resumes = await Resume.find({ user_id: req.userId });
    res.status(200).json(resumes);
}));

//@description CREATE NEW Resume
//@route POST/api/resumes
//@access private
router.post("/resumes", authenticate, asyncHandler(async (req, res) => {
    const { personalInfo, education, workExperience, skills, projects } = req.body;
    if (!personalInfo ||  !education || !workExperience || !skills || !projects) {
        return res.status(400).json({ error: "All fields are mandatory!" });
    }
    const resume = await Resume.create({
        personalInfo,
       
        education,
        workExperience,
        skills,
        projects,
        user_id: req.userId // Using the user ID from the authenticated user
    });
    res.status(201).json(resume);
}));

//@description GET Resume by ID
//@route Get/api/resumes/:id
//@access private
router.get("/resumes/:id", authenticate, asyncHandler(async (req, res) => {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
        res.status(404);
        throw new Error("Resume not found");
    }
    res.status(200).json(resume);
}));
//@description UPDATE Resume by ID
//@route PUT/api/resumes/:id
//@access private
router.put("/resumes/:id", authenticate, asyncHandler(async (req, res) => {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
        res.status(404);
        throw new Error("Resume not found");
    }
    if (resume.user_id.toString() !== req.userId) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user resumes");
    }
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedResume);
}));

//@description DELETE Resume by ID
//@route DELETE/api/resumes/:id
//@access private
router.delete("/resumes/:id", authenticate, asyncHandler(async (req, res) => {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
        res.status(404);
        throw new Error("Resume not found");
    }
    if (resume.user_id.toString() !== req.userId) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other user resumes");
    }
    await resume.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Resume deleted successfully" });
}));
module.exports = router;
