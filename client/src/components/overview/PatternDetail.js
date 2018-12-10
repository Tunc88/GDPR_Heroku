import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

import { createPattern } from "../../actions/patternActions";
import { getPattern } from "../../actions/patternActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import { Button, FormGroup, Checkbox } from "react-bootstrap";

class PatternDetail extends Component {
  constructor(props) {
    super(props);
    this.props.getPattern(this.props.match.params._id),
      (this.state = {
        pattern: this.props.pattern,
        name: "",
        context: "",
        summary: "",
        problem: "",
        forcesConcerns: "",
        solution: "",
        structure: "",
        implementation: "",
        consequences: "",
        liabilities: "",
        examples: "",
        relatedPatterns: "",
        sources: "",
        knownUses: "",
        assignedTactics: [],
        errors: {},
        editing: this.props.match.params.editing
      });

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.state);
    //alert(this.props.match.params._id);
    // alert(this.props.getPattern(this.props.match.params._id));
    this.props.getPattern(this.props.match.params._id),
      this.setState({ pattern: this.props.pattern });
  }

  componentWillReceiveProps(nextProps) {
    //alert(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.location.state.pattern) {
      const pattern = nextProps.location.state.pattern;

      // If pattern field doesnt exist, make empty string
      pattern.name = !isEmpty(pattern.name) ? pattern.name : "";
      pattern.context = !isEmpty(pattern.context) ? pattern.context : "";
      pattern.summary = !isEmpty(pattern.summary) ? pattern.summary : "";
      pattern.problem = !isEmpty(pattern.problem) ? pattern.problem : "";
      pattern.forcesConcerns = !isEmpty(pattern.forcesConcerns)
        ? pattern.forcesConcerns
        : "";
      pattern.solution = !isEmpty(pattern.solution) ? pattern.solution : "";
      pattern.structure = !isEmpty(pattern.structure) ? pattern.structure : "";
      pattern.implementation = !isEmpty(pattern.implementation)
        ? pattern.implementation
        : "";
      pattern.consequences = !isEmpty(pattern.consequences)
        ? pattern.consequences
        : "";
      //pattern.liabilities = !isEmpty(liabilities) ? pattern.liabilities : "";
      pattern.examples = !isEmpty(pattern.examples) ? pattern.examples : "";
      pattern.relatedPatterns = !isEmpty(pattern.relatedPatterns)
        ? pattern.relatedPatterns
        : "";
      pattern.sources = !isEmpty(pattern.sources) ? pattern.sources : "";
      pattern.knownUses = !isEmpty(pattern.knownUses) ? pattern.knownUses : "";
      pattern.assignedTactics = !isEmpty(pattern.assignedTactics)
        ? pattern.assignedTactics
        : [];

      // Set component fields state
      this.setState({
        name: pattern.name,
        context: pattern.context,
        summary: pattern.summary,
        problem: pattern.problem,
        forcesConcerns: pattern.forcesConcerns,
        solution: pattern.solution,
        structure: pattern.structure,
        implementation: pattern.implementation,
        consequences: pattern.consequences,
        // liabilities: pattern.liabilities,
        examples: pattern.examples,
        relatedPatterns: pattern.relatedPatterns,
        sources: pattern.sources,
        knownUses: pattern.knownUses,
        assignedTactics: pattern.assignedTactics
      });
    }
  }

  onChange(e) {
    alert(e.target.name);
    alert(e.target.value);
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
      forcesConcerns: this.state.forcesConcerns,
      solution: this.state.solution,
      structure: this.state.structure,
      implementation: this.state.implementation,
      consequences: this.state.consequences,
      benefits: this.state.benefits,
      liabilities: this.state.liabilities,
      examples: this.state.examples,
      relatedPatterns: this.state.relatedPatterns,
      sources: this.state.sources,
      knownUses: this.state.knownUser
    };

    this.props.createPattern(newPattern, this.props.history);
  }

  onChangeAssignedTactics = id => {
    let insertAssignedTactics = this.state.assignedTactics;
    //onChangeAssignedTactics(id) {
    //this.setState({ assignedTactics[this.state.assignedTactics.indexOf(id)]: true });
    // alert("hallo");
    if (this.state.assignedTactics.includes(id)) {
      insertAssignedTactics = this.state.assignedTactics.splice(
        this.state.assignedTactics.indexOf(id),
        1
      );
      this.setState({
        assignedTactics: insertAssignedTactics
      });
      alert("included" + this.state.assignedTactics.length);
    } else {
      insertAssignedTactics = this.state.assignedTactics.push(id);
      this.setState({
        assignedTactics: insertAssignedTactics
      });
      alert("not included" + this.state.assignedTactics.length);
    }
  };

  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {this.state.editing && isAuthenticated ? (
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
            <FormGroup>
              {this.state.assignedTactics.map(tactic => (
                <Checkbox
                  name="assignedTactics"
                  checked
                  onChange={() => this.onChangeAssignedTactics(tactic._id)}
                  value={tactic._id}
                >
                  {tactic.name}
                </Checkbox>
              ))}
            </FormGroup>

            <Button
              bsStyle="primary"
              style={{ marginBottom: "70px" }}
              onClick={this.onSubmit}
            >
              Create Pattern
            </Button>
          </form>
        ) : (
          <div>
            <h3>{this.state.name}</h3>
            <h5>Summary</h5>
            <div>{this.state.summary}</div>
            <h5>Context</h5>
            <div>{this.state.context}</div>
          </div>
        )}
      </div>
    );
  }
}

PatternDetail.propTypes = {
  createPattern: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  pattern: state.pattern
});

export default connect(
  mapStateToProps,
  { createPattern, getPattern }
)(withRouter(PatternDetail));
