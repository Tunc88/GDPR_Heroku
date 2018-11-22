const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateConcernInput(data) {
  let errors = {};

  data.concernNumber = !isEmpty(data.concernNumber) ? data.concernNumber : "";
  data.concernName = !isEmpty(data.concernName) ? data.concernName : "";
  data.concernDescription = !isEmpty(data.concernDescription)
    ? data.concernDescription
    : "";

  if (Validator.isEmpty(data.concernNumber)) {
    errors.concernNumber = "Number field is required";
  }

  if (!Validator.isLength(data.concernName, { min: 2, max: 30 })) {
    errors.concernName =
      "Name of the concern must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.concernName)) {
    errors.concernName = "Name field is required";
  }

  if (Validator.isEmpty(data.concernDescription)) {
    errors.concernDescription = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
