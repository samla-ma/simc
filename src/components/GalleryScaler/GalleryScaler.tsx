import { useState, useEffect, useRef } from "react";

export interface GalleryScalerCfg {
    mainTitle: string;
    resizerTitle: string;
    imageLabelStr: string;
    thumbnailLabelStr: string;

    applyActionStr: string;
    cancelActionStr: string;
    okActionStr: string;

    imgMaxDimension: number;
    thumbMaxDimension: number;
}

const defaultCfg: GalleryScalerCfg = {
    mainTitle: "Gallery setup",
    resizerTitle: "Max dimensions",
    imageLabelStr: "Image",
    thumbnailLabelStr: "Thumbnail",

    applyActionStr: "Apply",
    cancelActionStr: "Cancel",
    okActionStr: "OK",

    imgMaxDimension: 1200,
    thumbMaxDimension: 300,
};

interface GalleryScalerProps {
    files: File[];
    cfg?: GalleryScalerCfg;

    onApply?: (
        files: File[],
        imgSizes: ImgSize[],
        thumbSizes: ImgSize[],
    ) => void;
    onCancel?: () => void;
}

export interface ImgSize {
    width: number;
    height: number;
}

const GalleryScaler = (props: GalleryScalerProps) => {
    console.log("GalleryScaler");

    const cfg = { ...defaultCfg, ...props.cfg };
    const [isVisible, setIsVisible] = useState(true);

    const [imgSizes, setImgSizes] = useState<ImgSize[]>([]);
    const [thumbSizes, setThumbSizes] = useState<ImgSize[]>([]);

    const [imgDimension, setImageDimension] = useState<number>(
        props.cfg?.imgMaxDimension || defaultCfg.imgMaxDimension,
    );
    const [thumbDimension, setThumbDimension] = useState<number>(
        props.cfg?.thumbMaxDimension || defaultCfg.thumbMaxDimension,
    );

    const files = props.files;
    console.log("GalleryScaler files:", { files });

    const originalImgSizes = useRef<ImgSize[]>([]);
    const [objectUrls, setObjectUrls] = useState<string[]>([]);

    const calculateImgSize = (
        originalSize: ImgSize,
        maxDimension: number,
    ): ImgSize => {
        const aspectRatio = originalSize.width / originalSize.height;
        let width = originalSize.width;
        let height = originalSize.height;

        if (width > maxDimension) {
            width = maxDimension;
            height = Math.round(width / aspectRatio);
        }

        if (height > maxDimension) {
            height = maxDimension;
            width = Math.round(height * aspectRatio);
        }

        return { width, height };
    };

    const calculeteImageSizes = (
        imgDimension: number,
        thumbDimension: number,
    ) => {
        console.log("Calculating image sizes with dimensions:", {
            imgDimension,
            thumbDimension,
        });
        const calculatedSizes = originalImgSizes.current.map((size) =>
            calculateImgSize(size, imgDimension),
        );
        setImgSizes(calculatedSizes);

        const calculatedThumbSizes = originalImgSizes.current.map((size) =>
            calculateImgSize(size, thumbDimension),
        );
        setThumbSizes(calculatedThumbSizes);
    };

    const closeClick = () => {
        setIsVisible(false);
        if (props.onCancel) {
            props.onCancel();
        }
    };

    const applyClick = () => {
        setIsVisible(false);
        if (props.onApply) {
            props.onApply(files, imgSizes, thumbSizes);
        }
    };

    useEffect(() => {
        const nextUrls = props.files.map((file) => URL.createObjectURL(file));
        originalImgSizes.current = new Array(props.files.length).fill({
            width: 0,
            height: 0,
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setObjectUrls(nextUrls);

        console.log("Created object URLs for files:", nextUrls);

        return () => {
            nextUrls.forEach((url) => {
                URL.revokeObjectURL(url);
                console.log("Revoked object URL for file:", url);
            });
        };
    }, [props.files]);

    const onApplyResize = () => {
        console.log("Applying new dimesions:", {
            imgDimension,
            thumbDimension,
        });

        calculeteImageSizes(imgDimension, thumbDimension);
    };

    const imgLoadedCount = useRef(0);

    const handleImageLoad: React.ReactEventHandler<HTMLImageElement> = (
        event,
    ) => {
        console.log("Image loaded:", event.currentTarget);
        const { naturalWidth, naturalHeight } = event.currentTarget;
        console.log("Natural dimensions:", { naturalWidth, naturalHeight });

        for (let i = 0; i < objectUrls.length; i++) {
            const url = objectUrls[i];
            if (url === event.currentTarget.src) {
                originalImgSizes.current[i] = {
                    width: naturalWidth,
                    height: naturalHeight,
                };
                break;
            }
        }

        imgLoadedCount.current += 1;
        if (imgLoadedCount.current === props.files.length) {
            calculeteImageSizes(cfg.imgMaxDimension, cfg.thumbMaxDimension);
        }
    };

    const onKeyDownPreventMinus = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "-") {
            e.preventDefault();
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
                                width={
                                    thumbSizes.length === objectUrls.length
                                        ? thumbSizes[index].width || 0
                                        : 0
                                }
                                height={
                                    thumbSizes.length === objectUrls.length
                                        ? thumbSizes[index].height || 0
                                        : 0
                                }
                            />
                        ))}
                    </div>
                    <div className="dimension-input-section">
                        <strong>{cfg.resizerTitle}</strong>
                        <>
                            <label>
                                {props.cfg?.imageLabelStr ||
                                    defaultCfg.imageLabelStr}
                                <input
                                    className="number-input"
                                    type="number"
                                    min="1"
                                    max={
                                        props.cfg?.imgMaxDimension ||
                                        defaultCfg.imgMaxDimension
                                    }
                                    name="imgDimension"
                                    value={imgDimension}
                                    onChange={(e) =>
                                        setImageDimension(
                                            Number(e.target.value),
                                        )
                                    }
                                    onKeyDown={onKeyDownPreventMinus}
                                />
                            </label>

                            <label>
                                {props.cfg?.thumbnailLabelStr ||
                                    defaultCfg.thumbnailLabelStr}
                                <input
                                    className="number-input"
                                    type="number"
                                    min="1"
                                    name="thumbDimension"
                                    max={
                                        props.cfg?.thumbMaxDimension ||
                                        defaultCfg.thumbMaxDimension
                                    }
                                    value={thumbDimension}
                                    onChange={(e) =>
                                        setThumbDimension(
                                            Number(e.target.value),
                                        )
                                    }
                                    onKeyDown={onKeyDownPreventMinus}
                                />
                            </label>
                            <button
                                type="button"
                                id="applyChanges"
                                className="btn"
                                onClick={onApplyResize}
                            >
                                {cfg.applyActionStr}
                            </button>
                        </>
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

export default GalleryScaler;
