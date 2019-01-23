import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
//import { createPattern } from "../../actions/patternActions";
import {
  setAssignedTactics,
  setAssignedStrategies,
  clearChosenTactics,
  createPattern
} from "../../actions/patternActions";
import TextAreaField from "../common/TextAreaField";
import TextField from "../common/TextField";
import StrListGroupField from "../common/StrListGroupField";
import TacListGroupField from "../common/TacListGroupField";
import { getStrategies } from "../../actions/strategyActions";
import { Button, Row, Col, Panel, Tab, Tabs } from "react-bootstrap";
import store from "../../store";
import StrategyFeed from "./StrategyFeed";

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
      errors: {},
      activeKey: 1
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.props.getStrategies();
    this.props.clearChosenTactics();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  checkIfEmpty(e) {
    alert(e);
    if (this.state.summary == "") {
      this.setState({
        errors: {
          ...this.state.errors,
          summary: "Summary is required!"
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          summary: undefined
        }
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value == "") {
      this.setState({
        errors: {
          ...this.state.errors,
          [e.target.name]: [e.target.name] + " is required!"
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          [e.target.name]: undefined
        }
      });
    }
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
      knownUses: this.state.knownUses,
      assignedTactics: this.props.pattern.chosenTactics
      // assignedStrategies: store.getState().pattern.assignedStrategies,
      // assignedTactics: store.getState().pattern.assignedTactics.id //Fehlerquelle
    };
    console.log(this.props.history);
    //this.props.createPattern(newPattern, this.props.history);
  }

  createPattern = () => {
    const newPattern = {
      name: this.state.name,
      summary: this.state.summary,
      context: this.state.context,
      problem: this.state.problem,
      solution: this.state.solution,
      consequences: this.state.consequences,
      examples: this.state.examples,
      assignedTactics: this.props.pattern.chosenTactics
    };
    this.props.createPattern(newPattern, this.props.history);
  };

  handleSelect(activeKey) {
    //alert(`selected ${activeKey}`);

    this.setState({ activeKey });
  }

  onClickTextField = textField => {
    //alert("hallloo");
    if (this.state.summary == "") {
      this.setState({
        errors: {
          ...this.state.errors,
          summary: "Summary is required!"
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          summary: undefined
        }
      });
    }
  };
  render() {
    //const { loading2, strategies } = this.props;
    const { loading, tactics } = this.props;

    //let strategyContent;
    let tacticContent;

    if (tactics === null || loading) {
      tacticContent = <Spinner />;
    } else {
      tacticContent = <TacListGroupField tactics={this.props.strategies} />;
    }

    /*if (strategies === null || loading2) {
      strategyContent = <Spinner />;
    } else {
      strategyContent = (
        <StrListGroupField strategies={this.props.strategies} />
      );
    }*/
    const { strategies, loading3 } = this.props.strategy;
    let strategyContent;
    if (strategies === null || loading3) {
      strategyContent = <Spinner />;
    } else {
      strategyContent = (
        <StrategyFeed strategies={strategies} isFilter={false} />
      );
    }

    const { errors } = this.state;
    var seeStrategies = false;
    var seeAdditionals = false;
    if (
      this.state.name != "" &&
      this.state.summary != "" &&
      this.state.context != "" &&
      this.state.problem != "" &&
      this.state.solution != ""
    ) {
      seeStrategies = true;
    }
    if (this.props.pattern.chosenTactics.length != 0) {
      seeAdditionals = true;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <Panel>
          <Tabs
            defaultActiveKey={1}
            activeKey={this.state.activeKey}
            onSelect={this.handleSelect}
            id="Select-View"
            //onSelect={() => this.handleSelect()}
          >
            <Tab eventKey={1} title="1. Basic Information">
              <TextField
                label="Name of pattern"
                name="name"
                value={this.state.name} // must be changede to name
                placeholder="Enter the name of the pattern"
                onChange={this.onChange}
                error={errors.name}
                onBlur={this.onChange}
              />
              <TextAreaField
                label="Summary"
                name="summary"
                value={this.state.summary} // must be changed to summary
                placeholder="Enter Summary"
                onChange={this.onChange}
                error={errors.summary}
                onBlur={this.onChange}
              />
              <TextAreaField
                label="Context"
                name="context"
                value={this.state.context}
                placeholder="Enter Context"
                onChange={this.onChange}
                error={errors.context}
                onBlur={this.onChange}
              />
              <TextAreaField
                label="Problem"
                name="problem"
                value={this.state.problem}
                placeholder="Enter Problem"
                onChange={this.onChange}
                error={errors.problem}
                onBlur={this.onChange}
              />
              <TextAreaField
                label="Solution"
                name="solution"
                value={this.state.solution}
                placeholder="Enter Solution"
                onChange={this.onChange}
                error={errors.solution}
                onBlur={this.onChange}
              />{" "}
              {seeStrategies ? (
                <Button
                  bsStyle="primary"
                  className={"col-xs-12"}
                  onClick={() => this.handleSelect(2)}
                >
                  Set assigned Strategies
                </Button>
              ) : (
                <Button
                  bsStyle="primary"
                  onClick={() => this.handleSelect(2)}
                  disabled
                  className={"col-xs-12"}
                >
                  Set assigned Strategies
                </Button>
              )}
            </Tab>
            {seeStrategies ? (
              <Tab eventKey={2} title="2. Assigned Strategies">
                {" "}
                <br />
                <br />
                {strategyContent} <br />
                <br />
                {seeAdditionals ? (
                  <Button
                    className={"col-xs-12"}
                    bsStyle="primary"
                    onClick={() => this.handleSelect(3)}
                  >
                    Set additional Information
                  </Button>
                ) : (
                  <span>
                    <div style={{ fontWeight: "bold", color: "red" }}>
                      At least one tactic must be chosen!
                    </div>
                    <Button
                      className={"col-xs-12"}
                      bsStyle="primary"
                      onClick={() => this.handleSelect(3)}
                      disabled
                    >
                      Set additional Information
                    </Button>
                  </span>
                )}
              </Tab>
            ) : (
              <Tab eventKey={2} title="2. Assigned Strategies" disabled />
            )}
            {seeAdditionals ? (
              <Tab eventKey={3} title="3. Additional Information">
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
                <Button
                  bsStyle="primary"
                  className={"col-xs-12"}
                  onClick={this.createPattern}
                >
                  Create Pattern
                </Button>
              </Tab>
            ) : (
              <Tab eventKey={3} title="3. Additional Information" disabled />
            )}
          </Tabs>

          {/*<Row className="show-grid">
          <Col md={6}>
            <h4>Which Strategies will be covered</h4>
            {strategyContent}
          </Col>
          <Col md={6}>
            <h4>Choose also the covered Tactic</h4>
            {tacticContent}
          </Col>
        </Row>*/}
        </Panel>
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
  strategies: state.strategy.strategies,
  pattern: state.pattern,
  strategy: state.strategy
});

export default connect(
  mapStateToProps,
  {
    createPattern,
    getStrategies,
    setAssignedStrategies,
    setAssignedTactics,
    clearChosenTactics
  }
)(withRouter(CreatePattern));
