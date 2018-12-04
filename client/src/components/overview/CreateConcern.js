import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import { createTactic } from "../../actions/tacticActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import { Button } from "react-bootstrap";

class Createtactic extends Component {
  constructor() {
    super();
    this.state = {
      /*       summary: "", */
      tacticNumber: "2",
      tacticDescription: "",
      tacticName: "",
      /*       context: "",
      problem: "",
      forcestactics: "",
      solution: "",
      structure: "",
      implementation: "",
      consequences: "",
      benefits: "",
      liabilities: "",
      examples: "",
      relatedPatterns: "",
      sources: "",
      knownUser: "", */
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newtactic = {
      /* name: this.state.name, */
      tacticName: this.state.tacticName,
      tacticDescription: this.state.tacticDescription,
      tacticNumber: this.state.tacticNumber // must be changed to a variable
      /* sources: this.state.sources,
      summary: this.state.summary,
      context: this.state.context,
      problem: this.state.problem,
      forcestactics: this.state.forcestactics,
      solution: this.state.solution,
      structure: this.state.structure,
      implementation: this.state.implementation,
      consequences: this.state.consequences,
      benefits: this.state.benefits,
      liabilities: this.state.liabilities,
      examples: this.state.examples,
      relatedPatterns: this.state.relatedPatterns,
      sources: this.state.sources,
      knownUser: this.state.knownUser */
    };

    this.props.createtactic(newtactic, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          label="Name of tactic"
          name="tacticName"
          value={this.state.tacticName} // must be changede to name
          placeholder="Enter the name of the tactic"
          onChange={this.onChange}
        />

        <TextAreaField
          label="Description"
          name="tacticDescription"
          value={this.state.tacticDescription} // must be changed to summary
          placeholder="Enter Summary"
          onChange={this.onChange}
        />

        {/* <TextAreaField
          label="Context"
          name="context"
          value={this.state.context}
          placeholder="Enter Context"
          onChange={this.onChange}
        />

        <TextAreaField
          label="Problem"
          name="problem"
          value={this.state.problem}
          placeholder="Enter Problem"
          onChange={this.onChange}
        /> */}

        {/*         <TextAreaField
          label="Solution"
          name="solution"
          value={this.state.solution}
          placeholder="Enter Solution"
          onChange={this.onChange}
        />

        <TextAreaField
          label="Consequences"
          name="consequences"
          value={this.state.consequences}
          placeholder="Enter Consequences"
          onChange={this.onChange}
        />

        <TextAreaField
          label="Examples"
          name="examples"
          value={this.state.examples}
          placeholder="Enter Examples"
          onChange={this.onChange}
        /> */}

        <Button bsStyle="primary" onClick={this.onSubmit}>
          Create tactic
        </Button>
      </form>
    );
  }
}

Createtactic.propTypes = {
  createtactic: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createtactic }
)(withRouter(Createtactic));
