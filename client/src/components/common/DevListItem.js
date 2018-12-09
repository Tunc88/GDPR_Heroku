import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

class DevListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      assignedDevelopers: []
    };

    this.add = this.add.bind(this);
  }

  add() {
    var newArray = [...this.state.assignedDevelopers];
    newArray.push("test");
    this.setState(() => {
      return { assignedDevelopers: newArray };
    });
  }

  render() {
    const { developer, auth } = this.props;

    return <ListGroupItem onClick={this.add}>{developer.name}</ListGroupItem>;
  }
}

DevListItem.propTypes = {
  developer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(DevListItem);
