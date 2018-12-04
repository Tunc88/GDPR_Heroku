import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Panel, Col, Tabs, Tab, Button, Collapse } from "react-bootstrap";
import EditToolbarTactics from "../common/EditToolbarTactics";

class TacticItem extends Component {
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
    const { tactic, auth } = this.props;
    const open = this.state.open;
    let more;
    let tacticDescriptionFirstPart = tactic.description
      .split(" ", 10)
      .join(" ");
    let tacticDescriptionSecondPart = tactic.description.substring(
      tacticDescriptionFirstPart.length
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
            <h5>{tactic.tacticName}</h5>
            <EditToolbarTactics tactic={tactic} />
          </Panel.Heading>
          <Panel.Body>
            {tacticDescriptionFirstPart}
            <Collapse in={this.state.open}>
              <div>{tacticDescriptionSecondPart}</div>
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

TacticItem.propTypes = {
  tactic: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(TacticItem);
