import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAssignedTactics } from "../../actions/projectActions";
import {
  Panel,
  Col,
  Tabs,
  Tab,
  Button,
  Collapse,
  ListGroupItem
} from "react-bootstrap";
import EditToolbarTactics from "./EditToolbarTactics";

class TacListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      assignedTactics: []
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (!this.state.bsStyle) {
      var newArray = [...this.state.assignedTactics];
      newArray.push(e.target.name);

      var newbsStyle = "success";

      this.setState(() => {
        this.props.setAssignedTactics(newArray);
        return { assignedTactics: newArray, bsStyle: newbsStyle };
      });
    } else {
      newArray = [this.state.assignedTactics];
      newArray.pop();

      newbsStyle = "";

      this.setState(() => {
        this.props.setAssignedTactics(newArray);
        return { assignedTactics: newArray, bsStyle: newbsStyle };
      });
    }
  }

  render() {
    const { tactic, auth } = this.props;

    return (
      <ListGroupItem
        onClick={this.onClick}
        name={tactic.name}
        bsStyle={this.state.bsStyle}
      >
        {tactic.name}
      </ListGroupItem>
    );
  }
}

TacListItem.propTypes = {
  tactic: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setAssignedTactics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  assignedTactics: state.assignedTactics
});

export default connect(
  mapStateToProps,
  { setAssignedTactics }
)(TacListItem);
