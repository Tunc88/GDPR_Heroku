const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// Load Input Validation
const validateProjectInput = require("../../validation/createProject");

// Load Project model
const Project = require("../../models/Project");
// Load User model
const User = require("../../models/User");

// @route   GET api/projects/test
// @desc    Tests patterns route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Project Works" }));

// @route   GET api/projects/projets
// @desc    Get all projects
// @access  Public

router.get("/", (req, res) =>
  Project.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "assignedDevelopers",
        foreignField: "_id",
        as: "assignedDevelopers"
      }
    },
    {
      $lookup: {
        from: "strategies",
        localField: "assignedTactics",
        foreignField: "assignedTactics._id",
        as: "assignedStrategiesWithAllTactics"
      }
    },
    {
      $lookup: {
        from: "strategies",
        localField: "assignedStrategies",
        foreignField: "_id",
        as: "assignedStrategies"
      }
    }
  ])

    .exec()
    .then(projects => {
      projects.forEach(function(project) {
        project.assignedTactics.forEach(function(
          assignedTactic,
          assignedTacticIndex
        ) {
          project.assignedTactics[
            assignedTacticIndex
          ] = assignedTactic.toString();
        });
        project.assignedStrategiesWithAllTactics.forEach(function(
          assignedStrategy
        ) {
          var NewAssignedTactics = [];
          assignedStrategy.assignedTactics.forEach(function(
            tactic,
            tacticIndex
          ) {
            if (project.assignedTactics.includes(tactic._id.toString())) {
              //console.log("true");
              //console.log(assignedStrategy.assignedTactics[tacticIndex].name);
              NewAssignedTactics.push(
                assignedStrategy.assignedTactics[tacticIndex]
              );
            } else {
              //console.log("false");
              //console.log(assignedStrategy.assignedTactics[tacticIndex].name);
              //console.log(NewAssignedTactics);
            }

            // }
          });
          assignedStrategy.assignedTactics = NewAssignedTactics;
          //console.log(assignedStrategy);

          //console.log(assignedStrategy);
        });
      });

      /* projects.forEach(function(project) {
        project.assignedTactics.forEach(function(
          assignedTactic,
          assignedTacticIndex
        ) {
          project.assignedTactics[
            assignedTacticIndex
          ] = assignedTactic.toString();
        });
        project.assignedStrategiesWithAllTactics.forEach(function(
          assignedStrategy
        ) {
          var NewAssignedTactics = [];
          assignedStrategy.assignedTactics.forEach(function(
            tactic,
            tacticIndex
          ) {
            if (project.assignedTactics.includes(tactic._id.toString())) {
              console.log("true");
              console.log(assignedStrategy.assignedTactics[tacticIndex].name);
              NewAssignedTactics.push(
                assignedStrategy.assignedTactics[tacticIndex]
              );
            } else {
              console.log("false");
              console.log(assignedStrategy.assignedTactics[tacticIndex].name);

              console.log(NewAssignedTactics);
            }

            // }
          });
          assignedStrategy.assignedTactics = NewAssignedTactics;
          //console.log(assignedStrategy);

          console.log(assignedStrategy);
        });
      }); */

      //console.log(patterns[].assignedStrategiesWithAllTactics[]._id);
      //console.log(patterns[].assignedTactics[]._id);
      //console.log(patterns[].assignedTactics[]._id);
      // patterns.forEach(function(pattern) {
      // pattern.assignedTactics.forEach(function(tactic) {
      //console.log(tactic._id);
      //  });
      //console.log(pattern.assignedTactics);
      //  });
      if (!projects)
        return res.status(404).json({
          error: "Not Found",
          message: `Projects not found`
        });
      res.status(200).json(projects);
    })
    .catch(error =>
      res.status(500).json({
        error: "Internal Server Error",
        message: error.message
      })
    )
);

/* router.get("/", (req, res) =>
  Project.find({})
    .then(projects => {
      res.json(projects);
    })
    .catch(err => res.status(404).json({ msg: "No projects available" }))
);
 */
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

    if (req.body.name) projectFields.name = req.body.name;
    if (req.body.finished) projectFields.finished = req.body.finished;
    if (req.body.description) projectFields.description = req.body.description;
    if (req.body.assignedStrategies)
      projectFields.assignedStrategies = req.body.assignedStrategies;
    if (req.body.assignedTactics)
      projectFields.assignedTactics = req.body.assignedTactics;
    if (req.body.assignedDevelopers)
      projectFields.assignedDevelopers = req.body.assignedDevelopers;

    Project.findOne({ project: req.project._id }).then(project => {
      if (project) {
        Project.findOneAndUpdate(
          {
            project: req.project._id
          },
          {
            $set: projectFields
          },
          {
            new: true
          }
        ).then(project => res.json(project));
      }
    });

    /*


    Project.findOneAndUpdate(
      { _id: req.body.id },
      { $set: projectFields },
      { new: true }
    ).then(project => {
      res.json(req.params.id);
    })*/
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

  Project.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedDevelopers",
        foreignField: "_id",
        as: "assignedDevelopers"
      }
    },
    {
      $lookup: {
        from: "strategies",
        localField: "assignedTactics",
        foreignField: "assignedTactics._id",
        as: "assignedStrategiesWithAllTactics"
      }
    },
    {
      $lookup: {
        from: "strategies",
        localField: "assignedStrategies",
        foreignField: "_id",
        as: "assignedStrategies"
      }
    }
  ])

    .then(projects => {
      projects.forEach(function(project) {
        project.assignedTactics.forEach(function(
          assignedTactic,
          assignedTacticIndex
        ) {
          project.assignedTactics[
            assignedTacticIndex
          ] = assignedTactic.toString();
        });
        project.assignedStrategiesWithAllTactics.forEach(function(
          assignedStrategy
        ) {
          var NewAssignedTactics = [];
          assignedStrategy.assignedTactics.forEach(function(
            tactic,
            tacticIndex
          ) {
            if (project.assignedTactics.includes(tactic._id.toString())) {
              // console.log("true");
              //console.log(assignedStrategy.assignedTactics[tacticIndex].name);
              NewAssignedTactics.push(
                assignedStrategy.assignedTactics[tacticIndex]
              );
            } else {
              // console.log("false");
              //console.log(assignedStrategy.assignedTactics[tacticIndex].name);
              //console.log(NewAssignedTactics);
            }

            // }
          });
          assignedStrategy.assignedTactics = NewAssignedTactics;
          //console.log(assignedStrategy);

          //console.log(assignedStrategy);
        });
      });
      res.json(projects[0]);
    })
    .catch(err => res.status(404).json({ project: "There is no project" }));
});

// @route   POST api/projects/project/edit/:project_id
// @desc    Edit project by ID
// @access  Public

router.post("/project/edit", (req, res) => {
  const errors = {};

  const projectFields = {};
  const userFields = {};

  if (req.body.name) projectFields.name = req.body.name;
  if (req.body.finished) projectFields.finished = req.body.finished;
  if (req.body.progress) projectFields.progress = req.body.progress;
  if (req.body.description) projectFields.description = req.body.description;
  if (req.body.assignedStrategies)
    projectFields.assignedStrategies = req.body.assignedStrategies;
  if (req.body.assignedTactics)
    projectFields.assignedTactics = req.body.assignedTactics;
  if (req.body.assignedDevelopers)
    projectFields.assignedDevelopers = req.body.assignedDevelopers;

  if (req.body.assignedDevelopers) userFields.assignedProjects = req.body.id;

  //console.log(projectFields);

  console.log("123123" + req.body.id);
  for (var i = 0; i < req.body.assignedDevelopers.length; i++) {
    for (
      var j = 0;
      j < req.body.assignedDevelopers[i].assignedProjects.length;
      j++
    ) {
      console.log(
        "123123" + req.body.assignedDevelopers[i].assignedProjects[j]
      );
    }
    console.log("123123" + req.body.assignedDevelopers[i]);
  }

  Project.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: projectFields
    },
    {
      new: true
    }
  )
    .then(project => res.json(project))
    .catch(err => res.status(404).json({ project: "There is no project" }));
  /*
  for (var i = 0; i < req.body.assignedDevelopers.length; i++) {
    if (
      req.body.assignedDevelopers[i].assignedProjects.indexOf(req.body.id) ===
      -1
    ) {
      Console.log("Project wird hinzugefügt");
      User.findOneAndUpdate(
        { _id: req.body.assignedDevelopers[i]._id },
        {
          $push: userFields
        },
        {
          new: true
        }
      )
        .then(project => res.json(project))
        .catch(err => res.status(404).json({ project: "There is no user" }));
    } else {
      for (var i = 0; i < req.body.allDevelopers.length; i++) {
        if (
          req.body.allDevelopers[i].assignedProjects.indexOf(req.body.id) === -1
        ) {
          Console.log("Project bleibt");
        } else {
          Console.log("Project wird entfernt");
          /*User.findOneAndUpdate(
            { _id: req.body.allDevelopers[i]._id },
            {
              $pull: userFields
            },
            {
              new: true
            }
          )
            .then(project => res.json(project))
            .catch(err =>
              res.status(404).json({ project: "There is no user" })
            );
        }
      }
    }
  }*/
});

module.exports = router;
