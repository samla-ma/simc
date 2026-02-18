import { useState, useEffect } from "react";

export interface GalleryCreatorCfg {
    mainTitle: string;
    imageLabelStr: string;
    thumbnailLabelStr: string;

    applyActionStr: string;
    cancelActionStr: string;
    okActionStr: string;

    imgMaxDimension: number;
    thumbMaxDimension: number;
}

const defaultCfg: GalleryCreatorCfg = {
    mainTitle: "Gallery setup",

    imageLabelStr: "Image",
    thumbnailLabelStr: "Thumbnail",

    applyActionStr: "Apply",
    cancelActionStr: "Cancel",
    okActionStr: "OK",

    imgMaxDimension: 1200,
    thumbMaxDimension: 300,
};

interface GalleryCreatorProps {
    files: File[];
    cfg?: GalleryCreatorCfg;

    // onApply?: (
    //     file: File,
    //     imgSize: ImgSize,
    //     thumbSize: ImgSize,

    // ) => void;
    onCancel?: () => void;
}

export interface ImgSize {
    width: number;
    height: number;
}

const GalleryCreator = (props: GalleryCreatorProps) => {
    console.log("GalleryCreator");

    const cfg = { ...defaultCfg, ...props.cfg };
    const [isVisible, setIsVisible] = useState(true);
    // const [imgSize, setImgSize] = useState(props.cfg? props.cfg.imgMaxSize : defaultCfg.imgMaxSize);
    // const [thumbSize, setThumbSize] = useState(props.cfg? props.cfg.thumbMaxSize : defaultCfg.thumbMaxSize);

    const [originalImgSizes, setOriginalImgSizes] = useState<ImgSize[]>([]);
    const [objectUrls, setObjectUrls] = useState<string[]>([]);

    const files = props.files;
    console.log("GalleryCreator files:", { files });

    const closeClick = () => {
        setIsVisible(false);
        if (props.onCancel) {
            props.onCancel();
        }
    };

    // const applyClick = () => {
    //     setIsVisible(false);
    //     if (props.onApply) {
    //         props.onApply(file, imgSize, thumbSize);
    //     }
    // };

    useEffect(() => {
        const urls: string[] = props.files.map((file) =>
            URL.createObjectURL(file),
        );

        setObjectUrls(urls);
        console.log("Created object URLs for files:", urls);

        return () => {
            urls.forEach((url) => {
                URL.revokeObjectURL(url);
                console.log("Revoked object URL for file:", url);
            });
        };
    }, [props.files]);

    // const onApplyImgResize = (newSize: ImgSize) => {
    //     console.log("Applying new image size:", newSize);
    //     setImgSize(newSize);
    // };

    // const onApplyThumbResize = (newSize: ImgSize) => {
    //     console.log("Applying new thumbnail size:", newSize);
    //     setThumbSize(newSize);
    // };

    // const onThumbEnableChange = (enabled: boolean) => {
    //     console.log("Thumbnail enable state changed:", enabled);
    //     setThumbEnabled(enabled);
    // };

    const handleImageLoad: React.ReactEventHandler<HTMLImageElement> = (
        event,
    ) => {
        console.log("Images loaded:", event.currentTarget);
        const { naturalWidth, naturalHeight } = event.currentTarget;
        console.log("Natural dimensions:", { naturalWidth, naturalHeight });

        for (let i = 0; i < objectUrls.length; i++) {
            const url = objectUrls[i];
            if (url === event.currentTarget.src) {
                const newOriginalSizes = [...originalImgSizes];
                newOriginalSizes[i] = {
                    width: naturalWidth,
                    height: naturalHeight,
                };
                setOriginalImgSizes(newOriginalSizes);
                break;
            }
        }
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

                    <div className="gallery-preview-section">
                        {objectUrls.map((url, index) => (
                            <img
                                id={`previewImage-${index}`}
                                key={index}
                                src={url}
                                className="preview-image"
                                onLoad={handleImageLoad}
                                // width={imgSize.width || undefined}
                                // height={imgSize.height || undefined}
                            />
                        ))}
                    </div>

                    <div className="dialog-footer">
                        <div>Maximum size</div>
                        <div>
                            {/* <label>
                        {props.cfg?.imageLabelStr || defaultCfg.imageLabelStr}
                        <input
                            className="number-input"
                            type="number"
                            min="1"
                            max={props.cfg.maxSize}
                            name="width"
                            value={draftImgSize.width}
                            onChange={onWidthChange}
                            onKeyDown={onKeyDownPreventMinus}
                            disabled={!enabled}
                        />
                    </label>
                    <label>
                        {props.cfg.heightStr}
                        <input
                            className="number-input"
                            type="number"
                            min="1"
                            name="height"
                            max={props.cfg.maxImgSize.height}
                            value={draftImgSize.height}
                            onChange={onHeightChange}
                            onKeyDown={onKeyDownPreventMinus}
                            disabled={!enabled}
                        />
                    </label> */}
                        </div>
                        <button
                            type="button"
                            id="confirmInsert"
                            className="btn btn-primary"
                            //onClick={applyClick}
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

export default GalleryCreator;
