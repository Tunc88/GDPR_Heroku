const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateConcernInput = require("../../validation/createConcern");

// Load Concern model
const Concern = require("../../models/Concern");

// @route   GET api/concerns/test
// @desc    Tests concerns route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Concerns Works" }));

// @route   GET api/concerns/patterns
// @desc    Get all concerns
// @access  Public
router.get("/", (req, res) =>
  Concern.find({}).then(concerns => {
    res.json(concerns);
  })
);

// @route   GET api/concerns/createconcern
// @desc    Create Concern
// @access  Private
router.post("/createconcern", (req, res) => {
  const { errors, isValid } = validateConcernInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Concern.findOne({ concernName: req.body.concernName }).then(concern => {
    if (concern) {
      errors.concernName = "Concern already exists";
      return res.status(400).json(errors);
    } else {
      const newConcern = new Concern({
        concernNumber: req.body.concernNumber,
        concernName: req.body.concernName,
        concernDescription: req.body.concernDescription
      });
      newConcern
        .save()
        .then(concern => res.json(concern))
        .catch(err => console.log(err));
    }
  });
});

// @route   DELETE api/patterns/:id
// @desc    Delete pattern
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Concern.findById(req.params.id)
      .then(concern => {
        // Delete
        concern.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ concernnotfound: "No concern found" })
      );
  }
);

// @route   POST api/concern
// @desc    Edit concern
// @access  Private
router.post(
  "/editconcern",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateConcernInput(req.body);

    // Check Validation
    /*
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }*/

    // Get fields
    const concernFields = {};
    concernFields.id = req.body.id;
    if (req.body.concernName) concernFields.concernName = req.body.concernName;
    if (req.body.concernDescription)
      concernFields.concernDescription = req.body.concernDescription;

    Concern.findOneAndUpdate(
      { _id: req.body.id },
      { $set: concernFields },
      { new: true }
    ).then(concern => {
      Concern.find({}).then(concerns => {
        res.json(concerns);
      });
    });
  }
);

module.exports = router;
