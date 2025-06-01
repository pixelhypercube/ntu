import React, { useState,useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import ModuleSelect from "./ModuleSelect";
import FileSelect from "./FileSelect";
import moduleInfo from "./moduleObj.json";
import FileViewerComponent from "./FileViewerComponent";
import { FaSun,FaMoon } from 'react-icons/fa';
export default function App() {
  const [darkMode,setDarkMode] = useState(false);

  useEffect(()=>{
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    console.log("App mounted. Dark mode set to", prefersDark);
  },[])

  const modulesList = Object.keys(moduleInfo);
  let filesList = [];
  for (let module of modulesList) {
    const {files} = moduleInfo[module];
    filesList.push(...files.flat());
  }
  return (
    <div className={darkMode?"dark":""}>
      <header className={darkMode?"dark":""}>
        <div className={darkMode?"dark":""} id="toggle-light-dark" onClick={()=>{setDarkMode(!darkMode)}}>{darkMode ? <FaMoon style={{color:"white"}}></FaMoon> : <FaSun></FaSun>}</div>
        <h2 className={darkMode?"dark":""}>Kendrick's NTU Collection</h2>
      </header>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ModuleSelect darkMode={darkMode}/>}
          />
          {
            modulesList.map(moduleCode=>{
              return (
                <Route
                key={moduleCode}
                path={moduleCode}
                element={<FileSelect darkMode={darkMode}/>}
                />
              )
            })
          }
          {
            filesList.map(file=>{
              const {pathName,fileName,tags,desc,moduleCode,innerHTML} = file;
              return (
                <Route
                  path={"/FileViewer" + pathName}
                  element={<FileViewerComponent 
                  darkMode={darkMode}
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
      <footer className={darkMode ? "dark" : ""}>
          <div className="d-flex justify-content-center">
              <p>Created by <a className={darkMode ? "dark" : ""} href="https://github.com/pixelhypercube" target="_blank" rel="noopener noreferrer">@pixelhypercube</a></p>
          </div>
      </footer>
    </div>
  )
}