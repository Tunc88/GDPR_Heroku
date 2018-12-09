import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import TacListItem from "./TacListItem";

class TacListGroupField extends Component {
  render() {
    const tactics = this.props.tactics;
    //console.log(tactics);
    //return <div />;

    return tactics.map(tactic => (
      <TacListItem key={tactic._id} tactic={tactic} />
    ));
  }
}

TacListGroupField.propTypes = { tactics: PropTypes.array.isRequired };

export default TacListGroupField;
