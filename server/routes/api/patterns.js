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
router.get("/", (req, res) =>
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

module.exports = router;
