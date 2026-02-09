// import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

//import React from 'react';
import { createRoot } from 'react-dom/client';
import ImgViewer from './components/ImgViewer';
// Import any necessary global CSS or context providers here

export function loadImgViewer(elementId: string, props: React.ComponentProps<typeof ImgViewer>) {
  const container = document.getElementById(elementId);
  if (container) {
    const root = createRoot(container);
    root.render(<ImgViewer {...props} />);
  }
}

// Make it the default export as well for easier UMD access
//export default loadImgViewer;


// По желанию: выставляем функцию в глобальный объект window
//window.ImgViewerLib = { loadImgViewer  };

// export function unloadImgViewer(elementId: string) {
//   const container = document.getElementById(elementId);
//   if (container) {
//       const root = ReactDOM.createRoot(container);
//       root.unmount();
//   }
// };