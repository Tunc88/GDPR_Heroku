import React, { Component } from "react";
import PropTypes from "prop-types";
import PatternItem from "./PatternItem";

import { Panel, Col } from "react-bootstrap";

class PatternFeed extends Component {
  render() {
    const { patterns } = this.props;

    return (
      <Col xs={11}>
        {patterns.map(pattern => (
          <PatternItem key={pattern._id} pattern={pattern} />
        ))}
      </Col>
    );
  }
}

PatternFeed.propTypes = {
  patterns: PropTypes.array.isRequired
};

export default PatternFeed;
