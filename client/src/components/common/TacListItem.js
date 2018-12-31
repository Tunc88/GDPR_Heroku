import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
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
import store from "../../store";

class TacListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      assignedTactics: {},
      assignedTacticsForProject: store.getState().project.project
        .assignedTactics
      //nameDeveloper: ""
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    var arr = this.state.assignedTacticsForProject;

    if (arr !== undefined) {
      arr.map(el =>
        el === this.props.tactic._id
          ? this.setState(() => {
              return {
                bsStyle: !this.state.bsStyle ? "success" : undefined
              };
            })
          : ""
      );
    }
  }

  onClick(e) {
    this.setState(() => {
      this.props.setAssignedTactics(this.props.tactic);
      return {
        assignedTactics: this.props.tactic,
        bsStyle: !this.state.bsStyle ? "success" : undefined
      };
    });
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
  //nameDeveloper: state.nameDeveloper
});

export default connect(
  mapStateToProps,
  { setAssignedTactics }
)(TacListItem);
