import { useState, useEffect, useRef } from "react";

import ResizeSection from "./ResizeSection";

import AlignSection from "./AlignSection";
//import "../common.css";
//import "./ImgScaler.css";

import type { ImgSize } from "./ResizeSection";
import type { Alignment } from "./AlignSection";

export interface ImgScalerCfg {
    mainTitle: string;
    imgName: string;
    widthStr: string;
    heightStr: string;
    resizeSectionTitle: string;
    thumbnailSectionTitle: string;

    alignSectionTitle: string;
    alignLeftStr: string;
    alignCenterStr: string;
    alignRightStr: string;

    applyActionStr: string;
    cancelActionStr: string;
    okActionStr: string;

    maxSize: ImgSize;
    thumbMaxSize: ImgSize;
}

const defaultCfg: ImgScalerCfg = {
    mainTitle: "Image setup",
    imgName: "File name",
    widthStr: "Width",
    heightStr: "Height",
    resizeSectionTitle: "Resize Image",
    thumbnailSectionTitle: "Thumbnail",

    alignSectionTitle: "Alignment",
    alignLeftStr: "Left",
    alignCenterStr: "Center",
    alignRightStr: "Right",

    applyActionStr: "Apply",
    cancelActionStr: "Cancel",
    okActionStr: "OK",

    maxSize: { width: 1200, height: 800 },
    thumbMaxSize: { width: 300, height: 200 },
}

interface ImgScalerProps {
    file: File;
    cfg?: ImgScalerCfg;

    onApply?: (
        file: File,
        imgSize: ImgSize,
        thumbSize: ImgSize,
        alignment: Alignment,
    ) => void;
    onCancel?: () => void;
}

const ImgScaler = (props: ImgScalerProps) => {
    console.log("ImgScaler");

    const cfg = { ...defaultCfg, ...props.cfg };
    const [isVisible, setIsVisible] = useState(true);
    const [originalImgSize, setOriginalImgSize] = useState<ImgSize>({
        width: 0,
        height: 0,
    });

    const [imgSize, setImgSize] = useState<ImgSize>({ width: 0, height: 0 });
    const [thumbSize, setThumbSize] = useState<ImgSize>({
        width: 0,
        height: 0,
    });
    const [objectUrl, setObjectUrl] = useState<string>("");
    const [thumbEnabled, setThumbEnabled] = useState(false);
    const file = props.file;

    const alignment = useRef<Alignment>("none");

    const closeClick = () => {
        setIsVisible(false);
        if (props.onCancel) {
            props.onCancel();
        }
    };

    const applyClick = () => {
        setIsVisible(false);
        if (props.onApply) {
            props.onApply(file, imgSize, thumbSize, alignment.current);
        }
    };


    useEffect(() => {
        const url = URL.createObjectURL(file);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setObjectUrl(url);
        console.log("Created object URL for file:", url);

        return () => {
            URL.revokeObjectURL(url);
            console.log("Revoked object URL for file:", url);
        };
    }, [file]);

    const onApplyImgResize = (newSize: ImgSize) => {
        console.log("Applying new image size:", newSize);
        setImgSize(newSize);
    };

    const onApplyThumbResize = (newSize: ImgSize) => {
        console.log("Applying new thumbnail size:", newSize);
        setThumbSize(newSize);
    };

    const onThumbEnableChange = (enabled: boolean) => {
        console.log("Thumbnail enable state changed:", enabled);
        setThumbEnabled(enabled);
    };

    const onAlignChange = (align: Alignment) => {
        console.log("Alignment changed:", align);
        alignment.current = align;
    };

    const handleImageLoad: React.ReactEventHandler<HTMLImageElement> = (
        event,
    ) => {
        console.log("Image loaded:", event.currentTarget);
        const { naturalWidth, naturalHeight } = event.currentTarget;

        setOriginalImgSize({ width: naturalWidth, height: naturalHeight });
        setImgSize({ width: naturalWidth, height: naturalHeight });
        setThumbSize({
            width: Math.min(naturalWidth, cfg.thumbMaxSize.width),
            height: Math.min(naturalHeight, cfg.thumbMaxSize.height),
        });
    };

    return (
        isVisible && (
            <div id="img-scaler-overlay">
                <div
                    className="img-scaler-modal"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="dialog-header">
                        <h1>{cfg.mainTitle}</h1>
                        <button
                            type="button"
                            className="close-btn"
                            onClick={closeClick}
                        >
                            x
                        </button>
                    </div>

                    <div className="image-preview-section">
                        {objectUrl && (
                            <img
                                id="previewImage"
                                src={objectUrl}
                                className="preview-image"
                                onLoad={handleImageLoad}
                                width={imgSize.width || undefined}
                                height={imgSize.height || undefined}
                            />
                        )}
                    </div>

                    <div className="image-info">
                        <span>
                            <strong>{cfg.imgName}:</strong>{" "}
                            <span id="imageName">{file?.name}</span>
                        </span>
                        <span>
                            <strong>{cfg.widthStr}:</strong>{" "}
                            <span id="imageWidth">{originalImgSize.width}</span>
                            px
                        </span>
                        <span>
                            <strong>{cfg.heightStr}:</strong>{" "}
                            <span id="imageHeight">
                                {originalImgSize.height}
                            </span>
                            px
                        </span>
                    </div>

                    <div className="dialog-content">
                        <div className="left-section">
                            <h2>{cfg.thumbnailSectionTitle}</h2>
                            <div className="thumbnail-container">
                                {thumbEnabled && objectUrl && (
                                    <img
                                        id="thumbnailPreview"
                                        src={objectUrl}
                                        width={thumbSize.width || undefined}
                                        height={thumbSize.height || undefined}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="right-section">
                            {originalImgSize.width > 0 &&
                                originalImgSize.height > 0 && (
                                    <>
                                        <ResizeSection
                                            optional={false}
                                            imgSize={originalImgSize}
                                            cfg={{
                                                widthStr: cfg.widthStr,
                                                heightStr: cfg.heightStr,
                                                title: cfg.resizeSectionTitle,
                                                actionStr: cfg.applyActionStr,
                                                maxImgSize: cfg.maxSize,
                                            }}
                                            onChange={onApplyImgResize}
                                        />
                                        <ResizeSection
                                            optional={true}
                                            imgSize={originalImgSize}
                                            cfg={{
                                                widthStr: cfg.widthStr,
                                                heightStr: cfg.heightStr,
                                                title: cfg.thumbnailSectionTitle,
                                                actionStr: cfg.applyActionStr,
                                                maxImgSize: cfg.thumbMaxSize,
                                            }}
                                            onChange={onApplyThumbResize}
                                            onEnableChange={onThumbEnableChange}
                                        />
                                        <AlignSection
                                            cfg={{
                                                alignLeftStr: cfg.alignLeftStr,
                                                alignRightStr: cfg.alignRightStr,
                                                alignCenterStr: cfg.alignCenterStr,
                                                title: cfg.alignSectionTitle,
                                            }}
                                            onChange={onAlignChange}
                                        />
                                    </>
                                )}
                        </div>
                    </div>
                    <div className="dialog-footer">
                        <button
                            type="button"
                            id="confirmInsert"
                            className="btn btn-primary"
                            onClick={applyClick}
                        >
                            {cfg.okActionStr}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeClick}
                        >
                            {cfg.cancelActionStr}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default ImgScaler;
