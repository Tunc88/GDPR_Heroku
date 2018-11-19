import React, { Component } from "react";
import {
  PageHeader,
  ButtonToolbar,
  Button,
  Grid,
  Row,
  Col
} from "react-bootstrap";

import "./Description.css";

class Description extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>GDPR Recommender</PageHeader>
        <span>
          Privacy patterns are design solutions to common privacy problems — a
          way to translate "privacy-by-design" into practical advice for
          software engineering. We believe design patterns can help document
          common practices and standardize terminology. We are building a
          living, community space where all can contribute their own patterns.
        </span>

        <div className="rowC">
          <ButtonToolbar>
            <Button bsStyle="primary">Login</Button>
            <Button bsStyle="primary">Signin</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default Description;
