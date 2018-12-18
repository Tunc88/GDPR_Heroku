import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import DevListItem from "./DevListItem";

class DevListGroupField extends Component {
  render() {
    const developers = this.props.developers;
    //console.log(developers);
    //return <div />;

    return developers.map(developer => (
      <DevListItem key={developer._id} developer={developer} />
    ));
  }
}

DevListGroupField.propTypes = { developers: PropTypes.array.isRequired };

export default DevListGroupField;
