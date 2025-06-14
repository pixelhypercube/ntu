import React from "react";
import { Container } from "react-bootstrap";
import moduleInfo from "./moduleObj.json";
import ModuleInfo from "./components/ModuleInfo";
import FileContainer from "./components/FileContainer";

export default class FileSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleCode:window.location.hash.substring(2)
        };
    }
    componentDidMount() {
        const {moduleName,grade,semester,year,bgColor,bgColorDark,files,desc} = moduleInfo[this.state.moduleCode];
        this.setState({
            moduleName,
            grade,
            semester,
            year,
            bgColor,
            bgColorDark,
            files,
            desc
        });
    }
    render() {
        const {moduleCode,moduleName,grade,year,semester,bgColor,bgColorDark,files} = this.state;
        const {darkMode} = this.props;
        return (
            <div style={{minHeight:"800px"}}>
                <main>
                    <br></br>
                    <Container>
                        <ModuleInfo
                            moduleCode={moduleCode}
                            moduleName={moduleName}
                            grade={grade}
                            year={year}
                            semester={semester}
                            bgColor={darkMode ? bgColorDark : bgColor}
                            desc={this.state.desc}
                        />
                        <hr></hr>
                        {files ? files.map(file=>{
                            const {fileName,pathName,tags,desc,innerHTML} = file;
                            return (
                                <FileContainer
                                darkMode={darkMode}
                                key={fileName}
                                fileName={fileName}
                                tags={tags}
                                desc={desc}
                                innerHTML={innerHTML}
                                pathName={"/ntu/#/FileViewer"+pathName}
                                />
                            )
                        }) : <></>}
                    </Container>
                </main>
            </div>
        )
    }
}