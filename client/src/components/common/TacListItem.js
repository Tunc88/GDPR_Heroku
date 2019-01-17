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
    var arr = this.props.assignedTactics;

    if (
      arr !== undefined &&
      this.props.location.pathname !== "/create-project"
    ) {
      arr.map(el =>
        el._id === this.props.tactic._id
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
    if (this.props.finishedTactics.indexOf(this.props.tactic.name) === -1) {
      this.setState(() => {
        this.props.setAssignedTactics(this.props.tactic);
        return {
          assignedTactics: this.props.tactic,
          bsStyle: !this.state.bsStyle ? "success" : undefined
        };
      });
    } else {
      alert("Deselecting finished tactics are not possible!");
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
        {this.props.finishedTactics.indexOf(tactic.name) === -1 ? (
          ""
        ) : (
          <i class="far fa-check-circle" />
        )}
        {"     "}
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
  assignedTactics: state.project.assignedTactics,
  finishedTactics: state.project.project.finishedTactics
  //nameDeveloper: state.nameDeveloper
});

export default connect(
  mapStateToProps,
  { setAssignedTactics }
)(TacListItem);
