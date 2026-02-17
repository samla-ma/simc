import { useEffect, useState, useRef } from "react";
import "./ResizeSection.css";

export interface ImgSize {
    width: number;
    height: number;
}
export interface ResizeSectionCfg {
    widthStr: string;
    heightStr: string;
    title: string;
    actionStr: string;
    maxImgSize: ImgSize;
}
export interface ResizeSectionProps {
    optional?: boolean;
    imgSize: ImgSize;
    cfg: ResizeSectionCfg;
    onChange?: (newSize: ImgSize) => void;
    onEnableChange?: (enabled: boolean) => void;
}

const ResizeSection = (props: ResizeSectionProps) => {
    const badProps = !props.cfg.maxImgSize.height || !props.cfg.maxImgSize.width;
    const aspectRatio = badProps
        ? 1
        : props.imgSize.width / props.imgSize.height;

    const [enabled, setEnabled] = useState(!props.optional);

    // set initial draft image size based on aspect ratio and max size
    const resize = (newImgSize: ImgSize) => {
        if (badProps || newImgSize.height === 0 || newImgSize.width === 0)
            return newImgSize;

        const correctedImgSize = { ...newImgSize };
        if (
            newImgSize.width > props.cfg.maxImgSize.width ||
            newImgSize.height > props.cfg.maxImgSize.height
        ) {
            console.log(
                "Draft image size exceeds max size, adjusting: ",
                newImgSize,
            );
            const widthRatio = newImgSize.width / props.cfg.maxImgSize.width;
            const heightRatio = newImgSize.height / props.cfg.maxImgSize.height;
            const scaleFactor = Math.max(widthRatio, heightRatio);

            correctedImgSize.width = Math.round(newImgSize.width / scaleFactor);
            correctedImgSize.height = Math.round(
                newImgSize.height / scaleFactor,
            );
            console.log("Corrected image size: ", correctedImgSize);
        }

        return correctedImgSize;
    };

    const [draftImgSize, setDraftImgSize] = useState(() => resize(props.imgSize));

    const didInitRef = useRef(false);

    useEffect(() => {
        if (didInitRef.current) return;
        if (!enabled || !props.onChange) return;
        
        didInitRef.current = true;
        props.onChange(draftImgSize);
    }, [draftImgSize, enabled, props]);


    const onApply = () => {
        const correctedSize = resize(draftImgSize);
        if (props.onChange) {
            props.onChange(correctedSize);
        }
    };

    const onKeyDownPreventMinus = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "-") {
            e.preventDefault();
        }
    };

    const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!aspectRatio || !e.target.value) return;

        setDraftImgSize({
            width: Number(e.target.value),
            height: Math.round(Number(e.target.value) / aspectRatio),
        });
    };

    const onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!aspectRatio || !e.target.value) return;

        setDraftImgSize({
            width: Math.round(Number(e.target.value) * aspectRatio),
            height: Number(e.target.value),
        });
    };

    if (badProps) {
        console.log(
            "Invalid maxImgSize, skipping ResizeSection render: ",
            props.cfg.maxImgSize,
        );
        return null;
    }

    return (
        <>
            <div className="resize-section">
                <div className="resize-section-title">
                    {props.optional ? (
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                className="resize-section-checkbox"
                                checked={enabled}
                                onChange={() => {
                                    const newEnabled = !enabled;
                                    setEnabled(newEnabled);
                                    if (props.onEnableChange) {
                                        props.onEnableChange(newEnabled);
                                    }
                                }}
                            />
                            {props.cfg.title}
                        </label>
                    ) : (
                        props.cfg.title
                    )}
                </div>

                <div className="input-row">
                    <label>
                        {props.cfg.widthStr}
                        <input
                            className="number-input"
                            type="number"
                            min="1"
                            max={props.cfg.maxImgSize.width}
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
                    </label>
                    <button
                        type="button"
                        className="btn apply-btn"
                        onClick={onApply}
                        disabled={!enabled}
                    >
                        {props.cfg.actionStr}
                    </button>{" "}
                </div>
            </div>
        </>
    );
};

export default ResizeSection;
