const express = require("express");
const router = express.Router();

// Load Project model
const Project = require("../../models/Project");

// @route   GET api/patterns/test
// @desc    Tests patterns route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Project Works" }));

// @route   GET api/projects/projets
// @desc    Get all projects
// @access  Public
router.get("/project", (req, res) =>
  Project.find({}).then(projects => {
    res.json(projects);
  })
);
