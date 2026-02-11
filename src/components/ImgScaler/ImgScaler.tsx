//import { useState, useEffect } from "react";

import ResizeSection from "./ResizeSection";
import AlignSection from "./AlignSection";
import { useState } from "react";
import "../common.css";
import "./ImgScaler.css";

interface ImgScalerProps {
    mainTitle: string;
    imgName: string;
    widthStr: string;
    heightStr: string;
    resizeSectionTitle: string;
    resizeThumbnailSectionTitle: string;
    thumbnailSectionTitle: string;
    alignSectionTitle: string;
    alignLeftStr: string;
    alignCenterStr: string;
    alignRightStr: string;
    applyActionStr: string;
    cancelActionStr: string;
    okActionStr: string;

    imgInitWidth: number;
    imgInitHeight: number;
    imgMaxWidth: number;
    imgMaxHeight: number;
    thumbInitWidth: number;
    thumbInitHeight: number;
    thumbMaxWidth: number;
    thumbMaxHeight: number;
}

const ImgScaler = (props: ImgScalerProps) => {
    console.log("ImgScaler");

    const [isVisible, setIsVisible] = useState(true);

    const closeClick = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
        <div id="img-viewer-overlay" onClick={closeClick}>
            <div
                className="img-scaler-modal"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="dialog-header">
                    <h1>{props.mainTitle}</h1>
                    <button type="button" className="close-btn">x</button>
                </div>

                <div className="image-preview-section">
                    <img id="previewImage" src="" className="preview-image" />
                </div>

                <div className="image-info">
                    <span>
                        <strong>{props.imgName}:</strong>{" "}
                        <span id="imageName">-</span>
                    </span>
                    <span>
                        <strong>{props.widthStr}:</strong>{" "}
                        <span id="imageWidth">-</span>px
                    </span>
                    <span>
                        <strong>{props.heightStr}:</strong>{" "}
                        <span id="imageHeight">-</span>px
                    </span>
                </div>

                <div className="dialog-content">
                    <div className="left-section">
                        <h2>{props.thumbnailSectionTitle}</h2>
                        <div className="thumbnail-container">
                            <img id="thumbnailPreview" src="" />
                        </div>
                    </div>
                    <div className="right-section">
                        <ResizeSection
                            optional={false}
                            initWidth={props.imgInitWidth}
                            initHeight={props.imgInitHeight}
                            maxWidth={props.imgMaxWidth}
                            maxHeight={props.imgMaxHeight}
                            widthStr={props.widthStr}
                            heightStr={props.heightStr}
                            title={props.resizeSectionTitle}
                            action={props.applyActionStr}
                        />
                        <ResizeSection
                            optional={true}
                            initWidth={props.thumbInitWidth}
                            initHeight={props.thumbInitHeight}
                            maxWidth={props.thumbMaxWidth}
                            maxHeight={props.thumbMaxHeight}
                            widthStr={props.widthStr}
                            heightStr={props.heightStr}
                            title={props.thumbnailSectionTitle}
                            action={props.applyActionStr}
                        />

                        <AlignSection
                            alignCenterStr={props.alignCenterStr}
                            alignLeftStr={props.alignLeftStr}
                            alignRightStr={props.alignRightStr}
                            title={props.alignSectionTitle}
                        />
                    </div>
                </div>
                <div className="dialog-footer">
                    <button
                        type="button"
                        id="confirmInsert"
                        className="btn btn-primary"
                    >
                        {props.okActionStr}
                    </button>
                    <button type="button" className="btn btn-secondary">
                        {props.cancelActionStr}
                    </button>
                </div>
            </div>
        </div>
        )
    );
};

export default ImgScaler;
