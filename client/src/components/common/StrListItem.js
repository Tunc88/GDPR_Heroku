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
import store from "../../store";

class StrListItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      assignedStrategies: {},
      assignedStrategiesForProject: store.getState().project.project
        .assignedStrategies
      //nameDeveloper: ""
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    var arr = this.state.assignedStrategiesForProject;

    if (
      arr !== undefined &&
      this.props.location.pathname !== "/create-project"
    ) {
      arr.map(el =>
        el.name === this.props.strategy.name
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
    this.props.setAssignedStrategies(this.props.strategy);
    this.setState(() => {
      return {
        assignedStrategies: this.props.strategy,
        bsStyle: !this.state.bsStyle ? "success" : undefined
      };
    });

    this.setState({ assignedStrategies: this.props.assignedStrategies });
  }

  render() {
    // if (this.props.assignedStrategies != undefined) {
    //console.log(this.props.strategy);

    //}

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
