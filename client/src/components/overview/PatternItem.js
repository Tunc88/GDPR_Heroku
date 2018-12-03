import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbar from "../common/EditToolbar";

class PatternItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }
  extendMore = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { pattern, auth } = this.props;
    const open = this.state.open;
    let more;
    let patternDescriptionFirstPart = pattern.summary.split(" ", 10).join(" ");
    let patternDescriptionSecondPart = pattern.summary.substring(
      patternDescriptionFirstPart.length
    );
    if (open) {
      more = <p>Less...</p>;
    } else {
      more = <p>More...</p>;
    }

    return (
      <Col xs={4}>
        <Panel>
          <Panel.Heading>
            <Col xs={6}>
              <h4>{pattern.name}</h4>
            </Col>
            <Col xs={6}>
              <EditToolbar pattern={pattern} />
            </Col>
            <div>
              {pattern.assignedConcerns.map(concern => (
                <span>{concern.concernName} </span>
              ))}
            </div>
          </Panel.Heading>
          <Panel.Body>
            {patternDescriptionFirstPart}
            <Collapse in={this.state.open}>
              <div>{patternDescriptionSecondPart}</div>
            </Collapse>
            <div className="extendMore" onClick={this.extendMore}>
              {more}
            </div>
          </Panel.Body>
        </Panel>
      </Col>
    );
  }
}

PatternItem.propTypes = {
  pattern: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PatternItem);
