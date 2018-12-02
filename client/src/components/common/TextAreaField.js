import React from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

const TextAreaField = ({
  label,
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <FormGroup controlId="formControlsTextarea">
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        componentClass="textarea"
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </FormGroup>
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaField;
