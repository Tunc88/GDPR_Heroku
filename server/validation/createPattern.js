const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePatternInput(data) {
  let errors = {};

  data.patternNumber = !isEmpty(data.patternNumber) ? data.patternNumber : "";
  data.patternName = !isEmpty(data.patternName) ? data.patternName : "";
  data.patternDescription = !isEmpty(data.patternDescription)
    ? data.patternDescription
    : "";

  if (Validator.isEmpty(data.patternNumber)) {
    errors.patternNumber = "Number field is required";
  }

  if (!Validator.isLength(data.patternName, { min: 2, max: 30 })) {
    errors.patternName =
      "Name of the pattern must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.patternName)) {
    errors.patternName = "Name field is required";
  }

  if (Validator.isEmpty(data.patternDescription)) {
    errors.patternDescription = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
