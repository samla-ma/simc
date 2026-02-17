// import { useState } from "react";
// import ImgScaler from "./components/ImgScaler/ImgScaler";
// import type { ImgScalerCfg } from "./components/ImgScaler/ImgScaler";
// import cfg from "./cfg.json";

import "./App.css";

function App() {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0] ?? null;
//         setSelectedFile(file);
 
//     };

// const [draftTitle, setDraftTitle] = useState("");

// const [title, setTitle] = useState("");

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (!selectedFile) {
//             return;
//         }
//         // Placeholder for opening/processing the file.
//     };

//     return (
//         <>
//             <h1>{title}</h1>
//             <form className="file-open-form" onSubmit={handleSubmit}>
//                 <label className="file-open-label">
//                     Open file
//                     <input
//                         className="file-open-input"
//                         type="file"
//                         onChange={handleFileChange}
//                     />
//                 </label>

//                 <button className="apply-button" onClick={() => setTitle(draftTitle)}>
//                     Apply title
//                 </button>

//                 <input 
//                     value={draftTitle}
//                     onChange={(e) => setDraftTitle(e.target.value)}
//                     placeholder="Enter title" 
//                 />

//             </form>

//             {selectedFile && (
//                 <ImgScaler 
//                     cfg={cfg as ImgScalerCfg}
//                     file={selectedFile}
//                     />
//             )}
//         </>
//     );
    return <></>;
}

export default App;
