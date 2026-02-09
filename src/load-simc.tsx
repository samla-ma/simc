import { createRoot } from 'react-dom/client';
import ImgViewer from './components/ImgViewer/ImgViewer';
// Import any necessary global CSS or context providers here

export function loadImgViewer(elementId: string, props: React.ComponentProps<typeof ImgViewer>) {
  const container = document.getElementById(elementId);
  if (container) {
    const root = createRoot(container);
    root.render(<ImgViewer {...props} />);
  }
}

export function unloadImgViewer(elementId: string) {
  const container = document.getElementById(elementId);
  if (container) {
      const root = createRoot(container);
      root.unmount();
  }
};