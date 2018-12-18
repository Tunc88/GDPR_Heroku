import React, { Component } from "react";
import PropTypes from "prop-types";
import PatternItem from "./PatternItem";

import { Panel, Col } from "react-bootstrap";
//const index = 0;
//const setRow= false;
class PatternFeed extends Component {
  /*evaluateIndex() {
    index = index + 1;
    if ((index = 3)) {
      return true;
    } else {
      return false;
    }
  }*/
  row() {}
  render() {
    const { patterns } = this.props;
    //const index = 0;

    return (
      <Col xs={9}>
        {patterns.map((pattern, index) => (
          //{index=2? "":""}
          //<row index={2}></row>
          <PatternItem key={pattern._id} pattern={pattern} />
          //{this.evaluateIndex()? "":""}
        ))}
      </Col>
    );
  }
}

PatternFeed.propTypes = {
  patterns: PropTypes.array.isRequired
};

export default PatternFeed;
