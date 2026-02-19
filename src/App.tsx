import { useState } from "react";
// import ImgScaler from "./components/ImgScaler/ImgScaler";
// import type { ImgScalerCfg } from "./components/ImgScaler/ImgScaler";
// import cfg from "./cfg.json";

// import cfg from "./cfg.json";

import "./App.css";
import "./Components/GalleryScaler/GalleryScaler.css";
import GalleryScaler, {
    type GalleryScalerCfg,
    type ImgSize,
} from "./components/GalleryScaler/GalleryScaler";

function App() {
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
            ? Array.from(event.target.files)
            : null;
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

    const onApply = (
        files: File[],
        imgSizes: ImgSize[],
        thumbSizes: ImgSize[],
    ) => {
        files.forEach((file, index) => {
            console.log(
                `File: ${file.name}, Image Size: ${imgSizes[index].width}x${imgSizes[index].height}, Thumbnail Size: ${thumbSizes[index].width}x${thumbSizes[index].height}`,
            );
        });
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

                <button
                    className="apply-button"
                    onClick={() => setTitle(draftTitle)}
                >
                    Apply title
                </button>

                <input
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="Enter title"
                />
            </form>

            {selectedFiles && selectedFiles.length > 0 && (
                <GalleryScaler
                    cfg={null as unknown as GalleryScalerCfg}
                    files={selectedFiles}
                    onApply={onApply}
                />
            )}
        </>
    );
    return <></>;
}

export default App;
