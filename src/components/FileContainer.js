import React from "react";
import {Button, Row, Col} from "react-bootstrap";
import "./FileContainer.css";

export default class FileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const {fileName,pathName,tags,desc} = this.props;
        return (
            <Row className="file-container">
                <Col className="d-flex" style={{
                    alignItems:"start",
                    justifyContent:"center",
                    flexDirection:"column"
                }} xs={10}>
                    <h5>{fileName}</h5>
                    <div>{desc}</div>
                    <h6>Tags</h6>
                    <div className="d-flex">
                        {tags ? tags.map(tag=>{
                            return (
                                <div key={tag} className={"tag"}>
                                    {tag}
                                </div>
                            )
                        }) : <></>}
                    </div>
                </Col>
                <Col className="d-flex" style={{justifyContent:"end"}} xs={2}>
                    <Button onClick={()=>{
                        window.location.href=pathName;
                    }} variant="outline-dark">View File</Button>
                </Col>
            </Row>
        )
    }
}