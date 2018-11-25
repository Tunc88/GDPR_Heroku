import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import Spinner from "../common/Spinner";
import "./Overview.css";
import PatternFeed from "./PatternFeed";
import { getPatterns } from "../../actions/patternActions";
import ConcernFeed from "./ConcernFeed";
import { getConcerns } from "../../actions/concernActions";

class Overview extends Component {
  componentDidMount() {
    this.props.getPatterns();
    this.props.getConcerns();
  }

  render() {
    const { patterns, loading } = this.props.pattern;

    let patternContent;

    if (patterns === null || loading) {
      patternContent = <Spinner />;
    } else {
      patternContent = <PatternFeed patterns={patterns} />;
    }

    const { concerns, loading2 } = this.props.concern;
    let concernContent;

    if (concerns === null || loading2) {
      concernContent = <Spinner />;
    } else {
      concernContent = <ConcernFeed concerns={concerns} />;
    }

    return (
      <div>
        <Tabs defaultActiveKey={1} id="Select-View">
          <Tab eventKey={1} title="Grid View">
            <Col xs={12}>
              <h4>Patterns</h4>
            </Col>
            {patternContent}
            <Col xs={12}>
              <h4>Concerns</h4>
            </Col>
            {concernContent}
          </Tab>
          <Tab eventKey={2} title="Diagramm View" />
        </Tabs>
      </div>
    );
  }
}

Overview.propTypes = {
  getPatterns: PropTypes.func.isRequired,
  pattern: PropTypes.object.isRequired,
  getConcerns: PropTypes.func.isRequired,
  concern: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pattern: state.pattern,
  concern: state.concern
});

export default connect(
  mapStateToProps,
  { getPatterns, getConcerns }
)(Overview);
