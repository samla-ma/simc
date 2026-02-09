//import { useState, useEffect } from "react";
import ImgViewer from "./components/ImgViewer";

import "./App.css";

function App() {
    return (
        <>
            <div style={{ padding: '10px', color: '#666', fontSize: '12px' }}>
                React App mounted. Click images to view!
            </div>
            { 
                <ImgViewer selectorStr=".dataItem img" />
            }
        </>
    );
}

export default App;
