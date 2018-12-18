const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateProjectInput = require("../../validation/createProject");

// Load Project model
const Project = require("../../models/Project");

// @route   GET api/projects/test
// @desc    Tests patterns route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Project Works" }));

// @route   GET api/projects/projets
// @desc    Get all projects
// @access  Public
router.get("/", (req, res) =>
  Project.find({})
    .then(projects => {
      res.json(projects);
    })
    .catch(err => res.status(404).json({ msg: "No projects available" }))
);

// @route   GET api/projects/createproject
// @desc    Create Projects
// @access  Private
router.post(
  "/createproject",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Project.findOne({ name: req.body.name }).then(project => {
      if (project) {
        errors.name = "Project already exists";
        return res.status(400).json(errors);
      } else {
        const newProject = new Project({
          name: req.body.name,
          assignedStrategies: req.body.assignedStrategies,
          assignedTactics: req.body.assignedTactics,
          finished: req.body.finished,
          description: req.body.description,
          assignedDevelopers: req.body.assignedDevelopers,
          creator: req.user.id
        });
        newProject
          .save()
          .then(project => res.json(project))
          .catch(err => console.log(err));
      }
    });
  }
);

// @route   POST api/projects
// @desc    Edit project
// @access  Private
router.post(
  "/editproject",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    /*
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }*/

    // Get fields
    const projectFields = {};

    projectFields.id = req.body.id;
    if (req.body.name) projectFields.name = req.body.name;
    if (req.body.finished) projectFields.finished = req.body.finished;
    if (req.body.description) projectFields.description = req.body.description;
    if (req.body.assignedStrategies)
      projectFields.assignedStrategies = req.body.assignedStrategies;
    if (req.body.assignedTactics)
      projectFields.assignedTactics = req.body.assignedTactics;
    if (req.body.assignedDevelopers)
      projectFields.assignedDevelopers = req.body.assignedDevelopers;

    Project.findOneAndUpdate(
      { _id: req.body.id },
      { $set: projectFields },
      { new: true }
    ).then(project => {
      res.json(req.params.id);
    });
  }
);

// @route   DELETE api/projects/:id
// @desc    Delete project
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById(req.params.id)
      .then(project => {
        // Delete
        project.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ projectnotfound: "No project found" })
      );
  }
);

// @route   GET api/projects/project/:project_id
// @desc    Get project by ID
// @access  Public

router.get("/project/:id", (req, res) => {
  const errors = {};

  Project.findById(req.params.id)
    .then(project => {
      res.json(project);
    })
    .catch(err => res.status(404).json({ project: "There is no project" }));
});

// @route   POST api/projects/project/edit/:project_id
// @desc    Edit project by ID
// @access  Public

router.post("/project/edit/:id", (req, res) => {
  const errors = {};

  Project.findbyIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        finished: req.body.finshed,
        assignedTactics: req.body.assignedTactics,
        assignedStrategies: req.body.assignedStrategies,
        assignedDevelopers: req.body.assignedDevelopers
      }
    },
    { new: true }
  )
    .then(project => {
      res.json(true);
    })
    .catch(err => res.status(404).json({ project: "There is no project" }));
});

module.exports = router;
