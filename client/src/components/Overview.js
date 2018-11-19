import React, { Component } from 'react';
import { Panel, Col, Tabs, Tab, Button, Collapse, Well } from "react-bootstrap";
import './Overview.css';

class Overview extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };
    }
    extendMore= () => {
        this.setState({ open: !this.state.open             
        });
      };
    
    render() {
        const open = this.state.open;
    let more;

    if (open) {
      more = <p>Less...</p>;
    } else {
        more = <p>More...</p>;
    }
        return (
            <Col xs={8} xsOffset={2}>
                <Panel>
                    <Panel.Heading>Overview</Panel.Heading>
                    <Panel.Body>
                        <Tabs defaultActiveKey={1} id="Select-View">
                            <Tab eventKey={1} title="Grid View">
                                <Panel>
                                    <Panel.Heading>
                                        Privacy Aware Network Client
                                    </Panel.Heading>
                                    <Panel.Body>
                                        A privacy policy which is hard to understand is in an automated way converted into a more easy to read format.
                                        <Collapse in={this.state.open}>
                                            <div>
                                                
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                                                    accusamus terry richardson ad squid. Nihil anim keffiyeh
                                                    helvetica, craft beer labore wes anderson cred nesciunt sapiente
                                                    ea proident.
                                                
                                            </div>
                                        </Collapse>
                                        <p class="extendMore" onClick={this.extendMore}>
                                        
                                            {more}
                                    </p>
                                        
                                    </Panel.Body>
                                </Panel>
                                <Panel>
                                    <Panel.Heading>
                                        Privacy Aware Network Client
                                    </Panel.Heading>
                                    <Panel.Body>
                                        A privacy policy which is hard to understand is in an automated way converted into a more easy to read format.
                                        <p class="more-extension" onClick={() => this.setState({
                                            open: !this.state.open
                                        })}>
                                            more...
                                    </p>
                                        <Collapse in={this.state.open}>
                                            <div>
                                                <div>
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                                                    accusamus terry richardson ad squid. Nihil anim keffiyeh
                                                    helvetica, craft beer labore wes anderson cred nesciunt sapiente
                                                    ea proident.
                                                </div>
                                            </div>
                                        </Collapse>
                                    </Panel.Body>
                                </Panel>
                            </Tab>
                            <Tab eventKey={2} title="Diagramm View">
                                Tab 2 content
                            </Tab>
                        </Tabs>;
                    </Panel.Body>
                </Panel>
            </Col>
        );
    }
}

export default Overview;