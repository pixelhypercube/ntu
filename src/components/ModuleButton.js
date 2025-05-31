import React from "react";
import {Container} from "react-bootstrap";
import "./ModuleButton.css";

export default class ModuleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container 
            style={{backgroundColor:this.props.bgColor}}
            onClick={this.props.onClick}
            className="module-btn mb-4">
                <h3>{this.props.moduleCode}</h3>
                <hr></hr>
                <h5>{this.props.moduleDesc}</h5>
            </Container>
        )
    }
}