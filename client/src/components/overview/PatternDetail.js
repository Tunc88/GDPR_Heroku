import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

//import { createPattern } from "../../actions/patternActions";
import {
  getPattern,
  editPattern,
  createPattern
} from "../../actions/patternActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import EditToolbar from "../common/EditToolbar";
import PatternDetail_StrategiesWithTactics from "../overview/PatternDetail_StrategiesWithTactics";
import { Button, FormGroup, Checkbox, Col } from "react-bootstrap";

/*GET_PATTERN ohne Funktion*/

class PatternDetail extends Component {
  constructor(props) {
    super(props);
    //this.props.getPattern(this.props.match.params._id),
    this.state = {
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
      editing: false,
      assignedStrategiesWithAllTactics: []
    };

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
      pattern.assignedStrategiesWithAllTactics = !isEmpty(
        pattern.assignedStrategiesWithAllTactics
      )
        ? pattern.assignedStrategiesWithAllTactics
        : [];

      // Set component fields state
      this.setState({
        id: this.props.match.params._id,
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
        assignedTactics: pattern.assignedTactics,
        assignedStrategiesWithAllTactics:
          pattern.assignedStrategiesWithAllTactics,

        Editname: pattern.name,
        Editcontext: pattern.context,
        Editsummary: pattern.summary,
        Editproblem: pattern.problem,
        EditforcesConcerns: pattern.forcesConcerns,
        Editsolution: pattern.solution,
        Editstructure: pattern.structure,
        Editimplementation: pattern.implementation,
        Editconsequences: pattern.consequences,
        // liabilities: pattern.liabilities,
        Editexamples: pattern.examples,
        EditrelatedPatterns: pattern.relatedPatterns,
        Editsources: pattern.sources,
        EditknownUses: pattern.knownUses,
        EditassignedTactics: pattern.assignedTactics,
        EditassignedStrategiesWithAllTactics:
          pattern.EditassignedStrategiesWithAllTactics
      });
    }
  }

  onChange(e) {
    //alert(e.target.name);
    //alert(e.target.value);
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
      examples: this.state.examples,
      relatedPatterns: this.state.relatedPatterns,
      sources: this.state.sources,
      knownUses: this.state.knownUser
    };

    this.props.createPattern(newPattern, this.props.history);
  }

  editPattern = () => {
    const patternData = {
      name: this.state.Editname,
      sources: this.state.Editsources,
      summary: this.state.Editsummary,
      context: this.state.Editcontext,
      problem: this.state.Editproblem,
      forcesConcerns: this.state.EditforcesConcerns,
      solution: this.state.Editsolution,
      structure: this.state.Editstructure,
      implementation: this.state.Editimplementation,
      consequences: this.state.Editconsequences,
      benefits: this.state.Editbenefits,
      examples: this.state.Editexamples,
      relatedPatterns: this.state.EditrelatedPatterns,
      sources: this.state.Editsources,
      knownUses: this.state.EditknownUser,
      id: this.state.id
    };
    console.log(
      "function editpattern called in EditToolbar:" +
        patternData.name +
        patternData.summary
    );
    this.props.editPattern(patternData);
    this.setState({
      editing: false
    });
  };

  enableEditing = () => {
    this.setState({
      editing: true
    });
  };

  dismissChanges = () => {
    this.setState({
      editing: false
    });
  };

  isEmpty(patternProperty) {
    if ((patternProperty = "")) {
      return true;
    } else {
      return false;
    }
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
    const { pattern } = this.props.pattern;
    return (
      <Col xs={12}>
        {this.state.editing && isAuthenticated ? (
          <form onSubmit={this.onSubmit}>
            <TextField
              label="Name of pattern"
              name="Editname"
              value={this.state.Editname} // must be changede to name
              placeholder="Enter the name of the pattern"
              onChange={this.onChange}
            />

            <TextAreaField
              label="Description"
              name="Editsummary"
              value={this.state.Editsummary} // must be changed to summary
              placeholder="Enter Summary"
              onChange={this.onChange}
            />
            <TextAreaField
              label="Context"
              name="Editcontext"
              value={this.state.Editcontext}
              placeholder="Enter Context"
              onChange={this.onChange}
            />

            <TextAreaField
              label="Problem"
              name="Editproblem"
              value={this.state.Editproblem}
              placeholder="Enter Problem"
              onChange={this.onChange}
            />
            <TextAreaField
              label="Forces and Concerns"
              name="EditforcesConcerns"
              value={this.state.EditforcesConcerns}
              placeholder="Enter Forces and Concerns"
              onChange={this.onChange}
            />
            <TextAreaField
              label="Solution"
              name="Editsolution"
              value={this.state.Editsolution}
              placeholder="Enter Solution"
              onChange={this.onChange}
            />
            <TextAreaField
              label="Structure"
              name="Editstructure"
              value={this.state.Editstructure}
              placeholder="Enter Structure"
              onChange={this.onChange}
            />
            <TextAreaField
              label="Implementation"
              name="Editimplementation"
              value={this.state.Editimplementation}
              placeholder="Enter Implementation"
              onChange={this.onChange}
            />
            <TextAreaField
              label="Consequences"
              name="Editconsequences"
              value={this.state.Editconsequences}
              placeholder="Enter Consequences"
              onChange={this.onChange}
            />

            <TextAreaField
              label="Examples"
              name="Editexamples"
              value={this.state.Editexamples}
              placeholder="Enter Examples"
              onChange={this.onChange}
            />

            <TextAreaField
              label="known Uses"
              name="EditknownUses"
              value={this.state.EditknownUses}
              placeholder="Enter known Uses"
              onChange={this.onChange}
            />

            <TextAreaField
              label="related Patterns"
              name="EditrelatedPatterns"
              value={this.state.EditrelatedPatterns}
              placeholder="Enter related Patterns"
              onChange={this.onChange}
            />

            <TextAreaField
              label="Sources"
              name="Editsources"
              value={this.state.Editsources}
              placeholder="Enter Sources"
              onChange={this.onChange}
            />
            {/*<FormGroup>
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
              </FormGroup>*/}

            <Button
              bsStyle="primary"
              style={{ marginBottom: "70px" }}
              onClick={this.editPattern}
            >
              Save Changes
            </Button>
            <Button
              bsStyle="primary"
              style={{ marginBottom: "70px" }}
              onClick={this.dismissChanges}
            >
              Dismiss Changes
            </Button>
          </form>
        ) : (
          <div style={{ marginBottom: "70px" }}>
            {isAuthenticated ? (
              <Col xs={12}>
                <Col xs={6}>
                  <h3>{this.state.name}</h3>
                </Col>
                <Col xs={6}>
                  <EditToolbar
                    name={this.state.name}
                    _id={this.props.match.params._id}
                    enableEditing={() => this.enableEditing()}
                  />
                </Col>
              </Col>
            ) : (
              <h3>{this.state.name}</h3>
            )}
            <PatternDetail_StrategiesWithTactics
              assignedStrategiesWithAllTactics={
                this.state.assignedStrategiesWithAllTactics
              }
            />
            <Col xs={12}>
              <Col xs={12}>
                <h5>Summary</h5>
                <div>{this.state.summary}</div>
                <h5>Context</h5>
                <div>{this.state.context}</div>
                <h5>Problem</h5>
                <div>{this.state.problem}</div>
                {!isEmpty(this.state.forcesConcerns) ? (
                  <span>
                    <h5>Forces and Concerns</h5>
                    <div>{this.state.forcesConcerns}</div>
                  </span>
                ) : (
                  ""
                )}
                <h5>Solution</h5>
                <div>{this.state.solution}</div>
                {!isEmpty(this.state.structure) ? (
                  <span>
                    <h5>Structure</h5>
                    <div>{this.state.structure}</div>
                  </span>
                ) : (
                  ""
                )}
                {!isEmpty(this.state.implementation) ? (
                  <span>
                    <h5>Implementation</h5>
                    <div>{this.state.implementation}</div>
                  </span>
                ) : (
                  ""
                )}
                {!isEmpty(this.state.consequences) ? (
                  <span>
                    <h5>Consequences</h5>
                    <div>{this.state.consequences}</div>
                  </span>
                ) : (
                  ""
                )}
                <h5>Examples</h5>
                <div>{this.state.examples}</div>
                {!isEmpty(this.state.knownUses) ? (
                  <span>
                    <h5>Known Uses</h5>
                    <div>{this.state.knownUses}</div>
                  </span>
                ) : (
                  ""
                )}
                {!isEmpty(this.state.relatedPatterns) ? (
                  <span>
                    <h5>related Patterns</h5>
                    <div>{this.state.relatedPatterns}</div>
                  </span>
                ) : (
                  ""
                )}

                {!isEmpty(this.state.sources) ? (
                  <span>
                    <h5>Sources</h5>
                    <div>{this.state.sources}</div>
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Col>
          </div>
        )}
      </Col>
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
  { createPattern, getPattern, editPattern }
)(withRouter(PatternDetail));
