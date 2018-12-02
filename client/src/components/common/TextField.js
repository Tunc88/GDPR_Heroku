import React from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

const TextField = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <FormGroup controlId="formBasicText">
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        label={label}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FormGroup>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextField.defaultProps = {
  type: "text"
};

export default TextField;
