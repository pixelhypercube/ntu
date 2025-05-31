import React from "react";
import {Container} from "react-bootstrap";
import "./ModuleInfo.css";

export default class ModuleInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        const {moduleCode,moduleName,year,semester,grade,bgColor,desc} = this.props;
        return (
            <Container 
            style={{background:bgColor}}
            className="module-info">
                <h2>{moduleCode} - {moduleName}</h2>
                <h5>Academic Year {year}/{year+1}, Semester {semester}</h5>
                <hr style={{marginTop:"10px",marginBottom:"10px"}}></hr>
                <p>{desc}</p>
                <hr style={{marginTop:"10px",marginBottom:"10px"}}></hr>
                <h6>Grade Achieved: {grade}</h6>
            </Container>
        )
    }
}