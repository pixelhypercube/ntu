import React from "react";
import {Button, Row, Col} from "react-bootstrap";
import "./FileContainer.css";

export default class FileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {fileName,pathName,tags,desc,darkMode} = this.props;
        return (
            <Row style={{margin:"20px 10px 20px 10px"}} className={"file-container"+(darkMode ? " dark" : "")}>
                <Col className="d-flex" style={{
                    alignItems:"start",
                    justifyContent:"center",
                    flexDirection:"column"
                }} xs={10}>
                    <h5 style={{textAlign:"left"}}>{fileName}</h5>
                    <div style={{textAlign:"left"}}>{desc}</div>
                    <hr style={{width:"100%"}}></hr>
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
                    }} variant={"outline-"+(darkMode?"light":"dark")}>View File</Button>
                </Col>
            </Row>
        )
    }
}