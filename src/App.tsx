import { useState } from "react";
// import ImgScaler from "./components/ImgScaler/ImgScaler";
// import type { ImgScalerCfg } from "./components/ImgScaler/ImgScaler";
// import cfg from "./cfg.json";

// import cfg from "./cfg.json";

import "./App.css";
import "./Components/GalleryCreator/GalleryCreator.css";
import GalleryCreator, { type GalleryCreatorCfg } from "./components/GalleryCreator/GalleryCreator";

function App() {
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : null;
        setSelectedFiles(files);
 
    };

const [draftTitle, setDraftTitle] = useState("");

const [title, setTitle] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFiles || selectedFiles.length === 0) {
            return;
        }
        // Placeholder for opening/processing the file.
    };

    return (
        <>
            <h1>{title}</h1>
            <form className="file-open-form" onSubmit={handleSubmit}>
                <label className="file-open-label">
                    Open file
                    <input
                        className="file-open-input"
                        type="file"
                        onChange={handleFileChange}
                        multiple={true}
                    />
                </label>

                <button className="apply-button" onClick={() => setTitle(draftTitle)}>
                    Apply title
                </button>

                <input 
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="Enter title" 
                />

            </form>

            {selectedFiles && selectedFiles.length > 0 && (
                <GalleryCreator 
                    cfg={null as unknown as GalleryCreatorCfg}
                    files={selectedFiles}
                    />
            )}
        </>
    );
    return <></>;
}

export default App;
