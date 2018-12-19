import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import { createPattern } from "../../actions/patternActions";
import {
  setAssignedTactics,
  setAssignedStrategies
} from "../../actions/patternActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import StrListGroupField from "../common/StrListGroupField";
import TacListGroupField from "../common/TacListGroupField";
import { getStrategies } from "../../actions/strategyActions";
import { Button, Row, Col } from "react-bootstrap";
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
      assignedStrategies: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getStrategies();
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
      assignedStrategies: store.getState().pattern.assignedStrategies,
      assignedTactics: store.getState().pattern.assignedTactics.id //Fehlerquelle
    };

    this.props.createPattern(newPattern, this.props.history);
  }

  render() {
    const { loading2, strategies } = this.props;
    const { loading, tactics } = this.props;

    let strategyContent;
    let tacticContent;

    if (tactics === null || loading) {
      tacticContent = <Spinner />;
    } else {
      tacticContent = <TacListGroupField tactics={this.props.strategies} />;
    }

    if (strategies === null || loading2) {
      strategyContent = <Spinner />;
    } else {
      strategyContent = (
        <StrListGroupField strategies={this.props.strategies} />
      );
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

        <Row className="show-grid">
          <Col md={6}>
            <h4>Which Strategies will be covered</h4>
            {strategyContent}
          </Col>
          <Col md={6}>
            <h4>Choose also the covered Tactic</h4>
            {tacticContent}
          </Col>
        </Row>
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
  setAssignedStrategies: PropTypes.func.isRequired,
  getTactics: PropTypes.func.isRequired,
  getStrategies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  assignedTactics: state.pattern.assignedTactics,
  assignedStrategies: state.pattern.assignedStrategies,
  tactics: state.tactic.tactics,
  strategies: state.strategy.strategies
});

export default connect(
  mapStateToProps,
  { createPattern, getStrategies, setAssignedStrategies, setAssignedTactics }
)(withRouter(CreatePattern));
