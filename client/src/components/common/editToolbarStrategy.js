import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Glyphicon,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import { deleteStrategy, editStrategy } from "../../actions/strategyActions";
import TacticItem from "../overview/TacticItem";

class EditToolbarStrategy extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShowRemoveModal = this.handleShowRemoveModal.bind(this);
    this.handleCloseRemoveModal = this.handleCloseRemoveModal.bind(this);

    this.handleShowEditModal = this.handleShowEditModal.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);

    this.state = {
      showRemoveModal: false,
      showRemoveModal: false,
      name: this.props.strategy.name,
      description: this.props.strategy.description,
      assignedTactics: this.props.strategy.assignedTactics
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeAssignmentArray = this.onChangeAssignmentArray.bind(this);
    this.onChangeArray = this.onChangeArray.bind(this);
    this.onChangeAssignedTactics = this.onChangeAssignedTactics.bind(this);
    //this.state.assignedTactics = this.state.assignedTactics.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }
  /*onSubmit(e) {
    e.preventDefault();

    const patternData = {
      patternName: this.state.patternName,
      patternDescription: this.state.patternDescription
    };

    this.props.editPattern(patternData);
  }*/

  onChange(e) {
    //alert(e.target.name);
    //alert(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeAssignmentArray(e) {
    //alert(e.target.name);
    //alert(e.target.value);
    var tacticArray = this.state.assignedTactics;
    tacticArray[e.target.name].name = e.target.value;
    this.setState({
      assignedTactics: tacticArray
    });
  }

  onChangeArray(index, e) {
    e.preventDefault();
    alert(e.target.name);
    alert(e.target.value);
    this.setState({ [e.target.name[index]]: e.target.value });
  }
  /*onDelete(id) {
    this.props.onDelete(id);
  }*/
  handleCloseRemoveModal() {
    this.setState({ showRemoveModal: false });
  }

  handleShowRemoveModal() {
    this.setState({ showRemoveModal: true });
  }
  handleCloseEditModal() {
    this.setState({ showEditModal: false });
  }

  handleShowEditModal() {
    this.setState({
      name: this.props.strategy.name,
      description: this.props.strategy.description,
      assignedTactics: this.props.strategy.assignedTactics,
      showEditModal: true
    });
  }

  editStrategy = () => {
    const strategyData = {
      name: this.state.name,
      description: this.state.description,
      assignedTactics: this.state.assignedTactics,
      id: this.props.strategy._id
    };
    console.log(
      "function editstrategy called in EditToolbar:" +
        strategyData.name +
        strategyData.description
    );
    this.props.editStrategy(strategyData);
    this.handleCloseEditModal();
  };

  deleteStrategy = id => {
    console.log("function deletestrategy called in EditToolbar");
    this.props.deleteStrategy(id);
  };

  removeTacticFromArray = index => {
    var tacticArray = this.state.assignedTactics;
    //alert(tacticArray.getType());
    //alert(name);
    //alert(tacticArray.indexOf(name));
    tacticArray.splice(index, 1);
    this.setState({
      assignedTactics: tacticArray
    });
  };

  newTacticField = () => {
    var emptyTacticObject = { name: "", description: "" };
    var tacticArray = this.state.assignedTactics;
    tacticArray.push(emptyTacticObject);
    this.setState({
      assignedTactics: tacticArray
    });

    /*  var tacticField = document.createElement("INPUT");
    tacticField.setAttribute("type", "text");
    //var textnode = document.createTextNode("Water");
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);*/
  };

  onChangeAssignedTactics = (name, index) => {
    var tacticArray = this.state.assignedTactics;
    //alert(tacticArray[index].name);
    alert(name);
    tacticArray[index].name = name;
    //alert(tacticArray[index].name);
    this.setState({
      assignedTactics: tacticArray
    });
  };

  render() {
    //alert("render");
    const tactics = this.state.assignedTactics;
    return (
      <ButtonToolbar>
        <ButtonGroup>
          <Button onClick={this.handleShowEditModal}>
            <Glyphicon glyph="pencil" />
          </Button>
          <Button onClick={this.handleShowRemoveModal}>
            <Glyphicon glyph="remove" />
          </Button>
        </ButtonGroup>
        <div className="static-modal">
          <Modal
            show={this.state.showRemoveModal}
            onHide={this.handleCloseRemoveModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Do you want to delete {this.props.strategy.name} ?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button
                class="btn-lg btn-info"
                onClick={() => this.deleteStrategy(this.props.strategy._id)}
              >
                Confirm
              </Button>

              <Button onClick={this.handleCloseRemoveModal}>Cancel</Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.showEditModal}
            onHide={this.handleCloseEditModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit {this.props.strategy.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <FormGroup>
                  <ControlLabel>Strategy Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Strategy Name"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Strategy Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    type="text"
                    name="description"
                    value={this.state.description}
                    placeholder="Strategy Description"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Assigned Tactics</ControlLabel>
                  <Button onClick={() => this.newTacticField()}>
                    <Glyphicon glyph="plus" />
                  </Button>

                  {this.state.assignedTactics.map((tactic, index) => (
                    <span>
                      <FormControl
                        type="text"
                        name={index}
                        value={tactic.name}
                        placeholder="Tactic Name"
                        onChange={this.onChangeAssignmentArray}
                        /* onChange={() =>
                          this.onChangeAssignedTactics(tactic.name, index)
                        }*/
                        // onChange={this.onChangeArray(index)}
                      />

                      <Button onClick={() => this.removeTacticFromArray(index)}>
                        <Glyphicon glyph="remove" />
                      </Button>
                    </span>
                  ))}
                </FormGroup>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => this.editStrategy(this.props.strategy._id)}
              >
                Confirm
              </Button>

              <Button onClick={this.handleCloseEditModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </ButtonToolbar>
    );
  }
}

EditToolbarStrategy.propTypes = {
  deleteStrategy: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteStrategy, editStrategy }
)(EditToolbarStrategy);
