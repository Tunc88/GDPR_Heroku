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
  HelpBlock,
  Panel,
  Col
} from "react-bootstrap";
import { deleteStrategy, editStrategy } from "../../actions/strategyActions";
//import TacticItem from "../overview/TacticItem";
//import StrategyEditForm from "../overview/StrategyEditForm";

class StrategyEditForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      //editing: false,
      name: this.props.strategy.name,
      description: this.props.strategy.description,
      assignedTactics: this.props.strategy.assignedTactics
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeAssignmentArray = this.onChangeAssignmentArray.bind(this);
    this.onChangeArray = this.onChangeArray.bind(this);
    this.onChangeAssignedTactics = this.onChangeAssignedTactics.bind(this);
  }

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
    this.props.disableEditing();
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
      <Col xs={3}>
        <Panel className={"minHeightStrategy"}>
          <form>
            <Panel.Heading>
              <Panel.Title>
                <FormGroup>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Strategy Name"
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
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
                <Col xs={9}>
                  <ControlLabel>Assigned Tactics</ControlLabel>
                </Col>
                <Col xs={3}>
                  <Button
                    onClick={() => this.newTacticField()}
                    //style={{ marginLeft: "70px" }}
                  >
                    <Glyphicon glyph="plus" />
                  </Button>
                </Col>
                <br />
                <br />
                <br />
                {this.state.assignedTactics.map((tactic, index) => (
                  <div>
                    <Col xs={9}>
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
                    </Col>
                    <Col xs={3}>
                      <Button onClick={() => this.removeTacticFromArray(index)}>
                        <Glyphicon glyph="remove" />
                      </Button>
                    </Col>
                  </div>
                ))}
              </FormGroup>
            </Panel.Body>
            <Panel.Footer>
              <Button
                onClick={() => this.editStrategy(this.props.strategy._id)}
                //style={{ marginBottom: "100px" }}
              >
                Confirm Changes
              </Button>
            </Panel.Footer>
          </form>
        </Panel>
      </Col>
    );
  }
}

StrategyEditForm.propTypes = {
  deleteStrategy: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { editStrategy }
)(StrategyEditForm);
