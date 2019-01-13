import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { setFinishedTactic } from "../../actions/projectActions";
import {
  Panel,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  FormGroup,
  InputGroup,
  FormControl,
  Row
} from "react-bootstrap";

import TextAreaField from "./TextAreaField";
import "./ToDoProgress.css";

class ToDoProgress extends Component {
  constructor() {
    super();
    this.state = {
      finishedTactics: [],

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeTactic = this.onChangeTactic.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeTactic(e) {
    this.props.setFinishedTactic(this.state);
  }

  onClick(e) {}

  render() {
    //console.log(this.props.match.params.id);
    //console.log(this.state.comment);
    console.log(this.props);
    return (
      <div>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Todo box</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <ButtonToolbar>
              <ToggleButtonGroup type="checkbox" defaultValue={[]}>
                {console.log(this.props)}
                {this.props.assignedTactics.map(tactic => (
                  <ToggleButton key={tactic._id} value={tactic.name}>
                    {tactic.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

ToDoProgress.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setFinishedTactic: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { setFinishedTactic }
)(withRouter(ToDoProgress));
