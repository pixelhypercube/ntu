import React from "react";
import { Alert, Button, Container } from "react-bootstrap";
import AnkiViewer from "./components/AnkiCSVViewer";
import AnkiCSVViewer from "./components/AnkiCSVViewer";
export default class FileViewerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarning: true
        }
    }

    handleToggleWarning = () => {
        this.setState((prevState) => ({
            showWarning: !prevState.showWarning,
        }));
    };

    renderFile = (filePath, ext, innerHTML) => {
        const {darkMode} = this.props;
        switch (ext) {
            case 'pdf':
                return (
                    <embed
                    style={{
                        width:"80%",
                        minHeight:"800px"
                    }}
                    src={"/ntu"+filePath}></embed>
                );
            // case 'docx':
            //     return <DocxViewer filePath={filePath} />;
            
            // case 'xlsx':
            //     return <ExcelViewer filePath={filePath} />;
            
            // case 'pptx':
            //     return (
            //         <embed
            //             style={{ width: "80%", minHeight: "1000px" }}
            //             src={filePath.replace('.pptx', '.pdf')}
            //         />
            //     );
            case 'csv':
                return <AnkiCSVViewer darkMode={darkMode} filePath={"/ntu"+filePath} />
            case 'mp4':
                return <video src={"/ntu"+filePath} controls width="100%" />;
            case 'jpg':
            case 'png':
                return <img src={"/ntu"+filePath} alt="Preview" style={{ maxWidth: '100%' }} />;
            case "apkg":
                return <AnkiViewer filePath={"/ntu"+filePath} />
            default:
                if (innerHTML) {
                    return (
                        <div dangerouslySetInnerHTML={{__html:innerHTML}}></div>
                    )
                } else {
                    return (<p>Unsupported file format</p>);
                }
        }
    };


    render() {
        const {fileName,filePath,innerHTML,moduleCode,desc,darkMode} = this.props;
        const fileExt = filePath.split('.').pop().toLowerCase();
        const {showWarning} = this.state;
        return (
            <Container style={{minHeight:"800px"}}>
                <br></br>
                <h4>{moduleCode} - {fileName}</h4>
                <p>{desc}</p>
                {this.renderFile(filePath,fileExt,innerHTML)}
                <hr></hr>
                {/* Warning Message */}
                {showWarning && (
                    <>
                        <br></br>
                        <Alert className={darkMode ? "dark" : ""} variant="danger" style={{ maxWidth: "80%", margin: "auto" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <h5 style={{ margin: 0 }}>⚠️ Heads up!</h5>
                                <Button onClick={this.handleToggleWarning} variant={"outline-"+(darkMode?"light":"dark")}>Close</Button>
                            </div>
                            <hr style={{ margin: "8px 0" }} />
                            I'm sharing this to give you a rough idea of what coursework at NTU might look like.<br/>
                            Please <strong>don't copy or submit this as your own</strong> — it goes against NTU's rules and could land you in serious trouble.<br/>
                            It's always better to <strong>check in with your prof</strong> or <strong>ask for help</strong> if you're stuck.<br/>
                            Thanks for understanding! 🙏
                        </Alert>
                    </>
                )}
            </Container>
        )
    }
}