//import { useState, useEffect } from "react";
import ImgScaler from "./components/ImgScaler/ImgScaler";


import "./App.css";

function App() {
    return (
        <>
            <div style={{ padding: "10px", color: "#666", fontSize: "12px" }}>
                React App mounted. Click images to view!
            </div>
            {
                <>
                    <ImgScaler 
                    mainTitle="Image setup"
                    imgName="Image name"
                    widthStr="Width"
                    heightStr="Height"
                    resizeSectionTitle="Resize image"
                    resizeThumbnailSectionTitle="Resize thumbnail"
                    thumbnailSectionTitle="Thumbnail settings"
                    applyActionStr="Apply"
                    alignSectionTitle="Image alignment"
                    alignLeftStr="Left"
                    alignCenterStr="Center"
                    alignRightStr="Right"
                    imgInitWidth={800}
                    imgInitHeight={600}
                    imgMaxWidth={2000}
                    imgMaxHeight={2000}
                    thumbInitWidth={200}
                    thumbInitHeight={150}
                    thumbMaxWidth={500}
                    thumbMaxHeight={500}
                    okActionStr="OK"
                    cancelActionStr="Cancel"
                    />
                </>
            }
        </>
    );
}

export default App;
