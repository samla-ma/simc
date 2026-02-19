import { createRoot } from "react-dom/client";
import ImgViewer from "./components/ImgViewer/ImgViewer";
import ImgScaler from "./components/ImgScaler/ImgScaler";
import GalleryCreator from "./components/GalleryScaler/GalleryScaler";

import scalerStyles from "./components/ImgScaler/ImgScaler.css?inline";
import viewerStyles from "./components/ImgViewer/ImgViewer.css?inline";
import galCreatorStyles from "./components/GalleryCreator/GalleryCreator.css?inline";
// Import any necessary global CSS or context providers here
const useShadowHost = true; // Set to true if you want to use Shadow DOM for isolation

const getRoot = (
    useShadowHost: boolean,
    elementId: string,
) => {
    const container = document.getElementById(elementId);
    if (!container) {
        throw new Error(`Element with id "${elementId}" not found`);
    }

    let root: ReturnType<typeof createRoot>;
    let styleRoot: ShadowRoot | Element;

    if (useShadowHost) {
        let shadowRoot = container.shadowRoot;
        if (!shadowRoot) {
            shadowRoot = container.attachShadow({ mode: "open" });
        }
        styleRoot = shadowRoot;
        root = createRoot(shadowRoot);
    } else {
        styleRoot = document.head;
        root = createRoot(container);
    }


    return { root, styleRoot };
};

const injectStyle = (styleRoot: ShadowRoot | Element, styles: string) => {
    if (styles) {
        const styleTag = document.createElement("style");
        styleTag.textContent = styles;
        styleRoot.appendChild(styleTag);
    }
};

export function loadImgViewer(
    elementId: string,
    props: React.ComponentProps<typeof ImgViewer>,
) {
    const { root, styleRoot } = getRoot(useShadowHost, elementId);
    injectStyle(styleRoot, viewerStyles);
    root.render(<ImgViewer {...props} />);
}

export function unloadImgViewer(elementId: string) {
    const { root } = getRoot(useShadowHost, elementId);
    root.unmount();
}

export function loadImgScaler(
    elementId: string,
    props: React.ComponentProps<typeof ImgScaler>,
) {
    const { root, styleRoot } = getRoot(useShadowHost, elementId);
    injectStyle(styleRoot, scalerStyles);
    root.render(<ImgScaler {...props} />);
}

export function unloadImgScaler(elementId: string) {
    const { root } = getRoot(useShadowHost, elementId);
    root.unmount();
}

export function loadGalleryCreator(
    elementId: string,
    props: React.ComponentProps<typeof GalleryCreator>,
) {
    const { root, styleRoot } = getRoot(useShadowHost, elementId);
    injectStyle(styleRoot, galCreatorStyles);
    root.render(<GalleryCreator {...props} />);
}

export function unloadGalleryCreator(elementId: string) {
    const { root } = getRoot(useShadowHost, elementId);
    root.unmount();
}