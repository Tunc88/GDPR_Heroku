import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import "./Overview.css";
import PatternFeed from "./PatternFeed";
import { getPatterns } from "../../actions/patternActions";
//import TacticFeed from "./TacticFeed";
import { getTactics } from "../../actions/tacticActions";

class OverviewDPO extends Component {
  componentDidMount() {
    this.props.getPatterns();
    this.props.getTactics();
  }

  render() {
    const { patterns, loading } = this.props.pattern;

    let patternContent;

    if (patterns === null || loading) {
      patternContent = <Spinner />;
    } else {
      patternContent = <PatternFeed patterns={patterns} />;
    }

    const { tactics, loading2 } = this.props.tactic;
    let tacticContent;

    if (tactics === null || loading2) {
      tacticContent = <Spinner />;
    } else {
      //tacticContent = <tacticFeed tactics={tactics} />;
    }

    return (
      <div>
        <Tabs defaultActiveKey={1} id="Select-View">
          <Tab eventKey={1} title="Grid View">
            <Col xs={12}>
              <h4>Patterns</h4>
              <Link to="/create-pattern">
                <Button bsStyle="primary">Create new Pattern</Button>
              </Link>
            </Col>

            {patternContent}
            <Col xs={12}>
              <h4>tactics</h4>
              <Link to="/create-tactic">
                <Button bsStyle="primary">Create new tactic</Button>
              </Link>
            </Col>

            {/*tacticContent*/}
          </Tab>
          <Tab eventKey={2} title="Diagramm View" />
        </Tabs>
      </div>
    );
  }
}

OverviewDPO.propTypes = {
  getPatterns: PropTypes.func.isRequired,
  pattern: PropTypes.object.isRequired,
  getTactics: PropTypes.func.isRequired,
  tactic: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pattern: state.pattern,
  tactic: state.tactic
});

export default connect(
  mapStateToProps,
  { getPatterns, getTactics }
)(OverviewDPO);
