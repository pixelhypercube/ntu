import React from "react";
import { Container } from "react-bootstrap";
import moduleInfo from "./moduleObj.json";
import ModuleInfo from "./components/ModuleInfo";
import FileContainer from "./components/FileContainer";

export default class FileSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleCode:window.location.pathname.substring(1)
        };
    }
    componentDidMount() {
        const {moduleName,grade,semester,year,bgColor,files,desc} = moduleInfo[this.state.moduleCode];
        this.setState({
            moduleName,
            grade,
            semester,
            year,
            bgColor,
            files,
            desc
        });
    }
    render() {
        const {moduleCode,moduleName,grade,year,semester,bgColor,files} = this.state;
        return (
            <div>
                <main>
                    <br></br>
                    <Container>
                        <ModuleInfo
                            moduleCode={moduleCode}
                            moduleName={moduleName}
                            grade={grade}
                            year={year}
                            semester={semester}
                            bgColor={bgColor}
                            desc={this.state.desc}
                        />
                        <hr></hr>
                        {files ? files.map(file=>{
                            const {fileName,pathName,tags,desc,innerHTML} = file;
                            return (
                                <FileContainer
                                key={fileName}
                                fileName={fileName}
                                tags={tags}
                                desc={desc}
                                innerHTML={innerHTML}
                                pathName={"/FileViewer"+pathName}
                                />
                            )
                        }) : <></>}
                    </Container>
                </main>
            </div>
        )
    }
}