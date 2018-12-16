import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { setAssignedStrategies } from "../../actions/projectActions";
import {
  Panel,
  Col,
  Tabs,
  Tab,
  Button,
  Collapse,
  ListGroupItem
} from "react-bootstrap";
import EditToolbarStrategies from "./EditToolbarTactics";

class StrListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      assignedStrategies: {}
      //nameDeveloper: ""
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState(() => {
      this.props.setAssignedStrategies(this.props.strategy);
      return {
        assignedStrategies: this.props.strategy,
        bsStyle: !this.state.bsStyle ? "success" : undefined
      };
    });
  }

  render() {
    const { strategy, auth } = this.props;

    return (
      <ListGroupItem
        onClick={this.onClick}
        name={strategy.name}
        bsStyle={this.state.bsStyle}
      >
        {strategy.name}
      </ListGroupItem>
    );
  }
}

StrListItem.propTypes = {
  strategy: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setAssignedStrategies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  assignedStrategies: state.assignedStrategies
  //nameDeveloper: state.nameDeveloper
});

export default connect(
  mapStateToProps,
  { setAssignedStrategies }
)(StrListItem);
