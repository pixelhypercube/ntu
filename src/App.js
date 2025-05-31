import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import ModuleSelect from "./ModuleSelect";
import FileSelect from "./FileSelect";
import moduleInfo from "./moduleObj.json";
import FileViewerComponent from "./FileViewerComponent";
export default function App() {
  const modulesList = Object.keys(moduleInfo);
  let filesList = [];
  for (let module of modulesList) {
    const {files} = moduleInfo[module];
    filesList.push(...files.flat());
  }
  return (
    <>
      <header>
          <h2>Kendrick's NTU Collection</h2>
      </header>
      <Router>
        <Routes>
          <Route
            path="/ntu/"
            element={<ModuleSelect/>}
          />
          {
            modulesList.map(moduleCode=>{
              return (
                <Route
                path={"/ntu/"+moduleCode}
                element={<FileSelect/>}
                />
              )
            })
          }
          {
            filesList.map(file=>{
              const {pathName,fileName,tags,desc,moduleCode,innerHTML} = file;
              return (
                <Route
                path={"/ntu/FileViewer"+pathName}
                element={<FileViewerComponent 
                  moduleCode={moduleCode}
                  desc={desc} 
                  tags={tags}
                  innerHTML={innerHTML}
                  fileName={fileName} 
                  filePath={pathName}/>}
                />
              )
            })
          }
        </Routes>
      </Router>
    </>
  )
}