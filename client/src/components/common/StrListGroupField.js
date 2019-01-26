import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import StrListItem from "./StrListItem";

class StrListGroupField extends Component {
  render() {
    const strategies = this.props.strategies;
    //console.log(strategies);
    //return <div />;

    return strategies.map(strategy => (
      <StrListItem
        location={this.props.location}
        key={strategy._id}
        strategy={strategy}
      />
    ));
  }
}

StrListGroupField.propTypes = { strategies: PropTypes.array.isRequired };

export default StrListGroupField;
