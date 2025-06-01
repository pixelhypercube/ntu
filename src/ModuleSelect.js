import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import ModuleButton from "./components/ModuleButton";
import "./App.css";
import moduleInfo from "./moduleObj.json";

export default class ModuleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulesList:Object.keys(moduleInfo)
    }
  }

  render() {
    const {modulesList} = this.state;
    const {darkMode} = this.props;
    return (
      <div style={{minHeight:"800px"}}>
        <main>
          <Container>
            <h2 className="mt-2">Select a Module!</h2>
            <hr></hr>
            <Container clas="d-flex">
              <Row>
                {
                  modulesList.map((moduleCode)=>{
                    const {moduleName,bgColor,bgColorDark} = moduleInfo[moduleCode];
                    return (
                      <Col key={moduleCode} xs={12} sm={6} md={4} lg={3}>
                        <ModuleButton
                        bgColor={darkMode ? bgColorDark : bgColor}
                        onClick={()=>{
                            window.location.href = `/ntu/#/${moduleCode}`;
                        }}
                        moduleCode={moduleCode}
                        moduleDesc={moduleName}
                        />
                      </Col>
                    )
                  })
                }
              </Row>
            </Container>
          </Container>
        </main>
      </div>
    )
  }
}