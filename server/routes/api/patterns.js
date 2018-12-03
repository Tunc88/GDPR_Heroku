const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validatePatternInput = require("../../validation/createPattern");

// Load Pattern model
const Pattern = require("../../models/Pattern");

// @route   GET api/patterns/test
// @desc    Tests patterns route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Patterns Works" }));

// @route   GET api/patterns/patterns
// @desc    Get all patterns
// @access  Public

router.get("/", (req, res) =>
  Pattern.aggregate([
    {
      $lookup: {
        from: "concerns",
        localField: "assignedConcerns",
        foreignField: "_id",
        as: "assignedConcerns"
      }
    }
  ])
    .exec()
    .then(patterns => {
      if (!patterns)
        return res.status(404).json({
          error: "Not Found",
          message: `Pattern not found`
        });
      res.status(200).json(patterns);
    })
    .catch(error =>
      res.status(500).json({
        error: "Internal Server Error",
        message: error.message
      })
    )
);

// @route   GET api/patterns/createpattern
// @desc    Create Pattern
// @access  Private
router.post("/createpattern", (req, res) => {
  const { errors, isValid } = validatePatternInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Pattern.findOne({ name: req.body.patternName }).then(pattern => {
    if (pattern) {
      errors.name = "Pattern already exists";
      return res.status(400).json(errors);
    } else {
      const newPattern = new Pattern({
        patternNumber: req.body.patternNumber,
        name: req.body.name,
        patternName: req.body.patternName,
        patternDescription: req.body.patternDescription,
        assignedConcerns: req.body.assignedConcerns,
        context: req.body.context,
        summary: req.body.summary,
        problem: req.body.problem,
        forcesConcerns: req.body.forcesConcerns,
        solution: req.body.solution,
        structure: req.body.structure,
        implementation: req.body.implementation,
        consequences: req.body.consequences,
        liabilities: req.body.liabilities,
        relatedPatterns: req.body.relatedPatterns,
        sources: req.body.sources,
        knownUser: req.body.knownUser,
        examples: req.body.examples
      });
      newPattern
        .save()
        .then(pattern => res.json(pattern))
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
    Pattern.findById(req.params.id)
      .then(pattern => {
        // Delete
        pattern.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ patternnotfound: "No pattern found" })
      );
  }
);

// @route   POST api/patterns
// @desc    Edit pattern
// @access  Private
router.post(
  "/editpattern",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePatternInput(req.body);

    // Check Validation
    /*
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }*/

    // Get fields
    const patternFields = {};
    patternFields.id = req.body.id;
    if (req.body.patternName) patternFields.patternName = req.body.patternName;
    if (req.body.patternDescription)
      patternFields.patternDescription = req.body.patternDescription;

    Pattern.findOneAndUpdate(
      { _id: req.body.id },
      { $set: patternFields },
      { new: true }
    ).then(pattern => {
      Pattern.find({}).then(patterns => {
        res.json(patterns);
      });
    });
  }
);

module.exports = router;
