import React from "react";
import { ButtonGroup, Button, Glyphicon } from "react-bootstrap";

const Toolbar = ({}) => {
  return (
    <ButtonGroup>
      <Button onClick={this.handleShowEditModal}>
        <Glyphicon glyph="pencil" />
      </Button>
      <Button onClick={this.handleShowRemoveModal}>
        <Glyphicon glyph="remove" />
      </Button>
    </ButtonGroup>
  );
};

export default Toolbar;
