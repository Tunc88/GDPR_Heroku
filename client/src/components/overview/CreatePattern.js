import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import { createPattern } from "../../actions/patternActions";
import { setAssignedTactics } from "../../actions/projectActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import TacListGroupField from "../common/TacListGroupField";
import { getTactics } from "../../actions/tacticActions";
import { Button } from "react-bootstrap";
import store from "../../store";

class CreatePattern extends Component {
  constructor() {
    super();
    this.state = {
      summary: "",
      name: "",
      context: "",
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
      knownUses: "",
      assignedTactics: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getTactics();
  }

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

    const newPattern = {
      name: this.state.name,
      sources: this.state.sources,
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
      knownUses: this.state.knownUser,
      assignedTactics: store.getState().project.assignedTactics
    };

    this.props.createPattern(newPattern, this.props.history);
  }

  render() {
    const { loading2, tactics } = this.props;

    let tacticContent;

    if (tactics === null || loading2) {
      tacticContent = <Spinner />;
    } else {
      tacticContent = <TacListGroupField tactics={this.props.tactics} />;
    }

    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          label="Name of pattern"
          name="name"
          value={this.state.name} // must be changede to name
          placeholder="Enter the name of the pattern"
          onChange={this.onChange}
        />

        <TextAreaField
          label="Description"
          name="summary"
          value={this.state.summary} // must be changed to summary
          placeholder="Enter Summary"
          onChange={this.onChange}
        />

        <TextAreaField
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
        />

        <TextAreaField
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
        />

        <h4>Which Tactics will be covered</h4>
        {tacticContent}
        <Button bsStyle="primary" onClick={this.onSubmit}>
          Create Pattern
        </Button>
      </form>
    );
  }
}

CreatePattern.propTypes = {
  createPattern: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setAssignedTactics: PropTypes.func.isRequired,
  getTactics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  assignedTactics: state.project.assignedTactics,
  tactics: state.tactic.tactics
});

export default connect(
  mapStateToProps,
  { createPattern, getTactics, setAssignedTactics }
)(withRouter(CreatePattern));
