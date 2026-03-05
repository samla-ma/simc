import { useState } from "react";

import "./App.css";
import "./Components/GalleryScaler/GalleryScaler.css";
import "./Components/ImgScaler/ImgScaler.css";
import GalleryScaler, {
    type GalleryScalerCfg,
    type ImgSize,
} from "./components/GalleryScaler/GalleryScaler";

import ImgScaler from "./components/ImgScaler/ImgScaler";
import type { ImgScalerCfg } from "./components/ImgScaler/ImgScaler";

function App() {
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
            ? Array.from(event.target.files)
            : null;
        setSelectedFiles(files);
    };

    //const [draftTitle, setDraftTitle] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFiles || selectedFiles.length === 0) {
            return;
        }
        // Placeholder for opening/processing the file.
    };

    const onGalleryApply = (
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

    const onImgApply = (
        file: File,
        imgSize: ImgSize,
        thumbSize: ImgSize | null,
        align: string,
    ) => {
        console.log(
            `File: ${file.name}, Image Size: ${imgSize.width}x${imgSize.height}, Thumbnail Size: ${thumbSize ? `${thumbSize.width}x${thumbSize.height}` : "N/A"}, Align: ${align}`,
        );
    };

    return (
        <>
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

                {/* <button
                    className="apply-button"
                    onClick={() => setTitle(draftTitle)}
                >
                    Apply title
                </button>

                <input
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="Enter title"
                /> */}
            </form>

            {selectedFiles && selectedFiles.length > 1 && (
                <GalleryScaler
                    cfg={null as unknown as GalleryScalerCfg}
                    files={selectedFiles}
                    onApply={onGalleryApply}
                />
            )}

            {selectedFiles && selectedFiles.length == 1 && (
                <ImgScaler
                    cfg={null as unknown as ImgScalerCfg}
                    file={selectedFiles[0]}
                    onApply={onImgApply}
                />
            )}
        </>
    );
    return <></>;
}

export default App;
