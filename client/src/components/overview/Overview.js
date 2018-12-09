import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Panel,
  Col,
  Tabs,
  Tab,
  Button,
  Glyphicon,
  InputGroup,
  Badge
} from "react-bootstrap";
import Spinner from "../common/Spinner";
import "./Overview.css";
import PatternFeed from "./PatternFeed";
import { getPatterns } from "../../actions/patternActions";
import TacticFeed from "./TacticFeed";
import { getTactics } from "../../actions/tacticActions";
import StrategyFeed from "./StrategyFeed";
import { getStrategies } from "../../actions/strategyActions";
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: mql.matches
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentDidMount() {
    this.props.getPatterns();
    this.props.getTactics();
    this.props.getStrategies();
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
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
      tacticContent = <TacticFeed tactics={tactics} />;
    }

    const { strategies, loading3 } = this.props.strategy;
    let strategyContent;

    if (strategies === null || loading3) {
      strategyContent = <Spinner />;
    } else {
      strategyContent = <StrategyFeed strategies={strategies} />;
    }

    return (
      <div>
        <Sidebar
          sidebar={
            <div>
              <h4>Filter</h4>
              {strategyContent}
            </div>
          }
          open={this.state.sidebarOpen}
          docked={true}
          pullRight={true}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: {
              background: "white",
              position: "fixed",
              marginTop: "52px"
            }
          }}
        />
        <Tabs defaultActiveKey={1} id="Select-View">
          <Tab eventKey={1} title="Grid View">
            <br />
            <Col xs={12}>
              <span className={"h4"}>
                Patterns <Badge>{patterns.length}</Badge>
              </span>
              <Button className={"glyphicon-button"}>
                <Glyphicon glyph="plus" />
              </Button>
            </Col>
            <br />
            <br />
            <br />
            {patternContent}
            <Col xs={12}>
              <h4>Tactics</h4>
            </Col>
            {/*tacticContent*/}
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
  getTactics: PropTypes.func.isRequired,
  tactic: PropTypes.object.isRequired,
  getStrategies: PropTypes.func.isRequired,
  strategy: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pattern: state.pattern,
  tactic: state.tactic,
  strategy: state.strategy
});

export default connect(
  mapStateToProps,
  { getPatterns, getTactics, getStrategies }
)(Overview);
