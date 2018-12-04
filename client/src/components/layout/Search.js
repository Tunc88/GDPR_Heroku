import React, { Component } from "react";
import { Col, Thumbnail, Grid, Row } from "react-bootstrap";

class Search extends Component {
  render() {
    return (
      <div>
        <h1>Found objects</h1>

        <Grid>
          <h2>tactics</h2>
          <Row>
            <Col xs={2} md={2}>
              <Thumbnail src={this.props.pic} alt="121x100" href="/create">
                <h3>tactic</h3>
                <p>Description of tactic</p>
              </Thumbnail>
            </Col>
          </Row>

          <h2>Pattern</h2>
          <Row>
            <Col xs={2} md={2}>
              <Thumbnail src={this.props.pic} alt="121x100" href="/create">
                <h3>Pattern</h3>
                <p>Description of pattern</p>
              </Thumbnail>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Search;
