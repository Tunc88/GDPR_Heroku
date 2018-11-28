import React, { Component } from "react";
import { Col, Thumbnail, Grid, Row, Button } from "react-bootstrap";

export default class OverviewPm extends Component {
  render() {
    return (
      <Grid>
        <h2>Project Overview</h2>
        <Button bsStyle="primary">Create Concern</Button>
        <Row componentClass={"Content"}>
          <Col xs={2} md={2}>
            <Thumbnail
              alt="121x100"
              progress={this.props.progress}
              href="/IDofProject"
            >
              <h3>{this.props.title}</h3>
              <p>{this.props.knownUser}</p>
            </Thumbnail>
          </Col>
        </Row>
      </Grid>
    );
  }
}
