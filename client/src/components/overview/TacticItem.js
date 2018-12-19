import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Glyphicon,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Checkbox
} from "react-bootstrap";

class TacticItem extends Component {
  onChange(e) {
    // alert(e.target.name);
    // alert(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  /*onDelete(id) {
    this.props.onDelete(id);
  }*/
  onChangeAssignedTactics = id => {
    //onChangeAssignedTactics(id) {
    //this.setState({ assignedTactics[this.state.assignedTactics.indexOf(id)]: true });
    this.state.assignedTactics.splice(
      this.state.assignedTactics.indexOf(id),
      1
    );
  };

  render() {
    const { tactics } = this.props.tactics;
    return (
      <ul>
        {tactics.map(tactic => (
          <li>{tactic.name}</li>
        ))}
      </ul>
    );
  }
}

export default TacticItem;
