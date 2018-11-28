const express = require("express");
const router = express.Router();

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
router.get("/patterns", (req, res) =>
  Pattern.find({}).then(patterns => {
    res.json(patterns);
  })
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

  Pattern.findOne({ patternName: req.body.patternName }).then(pattern => {
    if (pattern) {
      errors.patternName = "Pattern already exists";
      return res.status(400).json(errors);
    } else {
      const newPattern = new Pattern({
        patternNumber: req.body.patternNumber,
        patternName: req.body.patternName,
        patternDescription: req.body.patternDescription,
        assignedConcerns: req.body.assignedConcerns
      });
      newPattern
        .save()
        .then(pattern => res.json(pattern))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
