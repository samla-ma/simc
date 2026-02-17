import { useState } from "react";
import "./AlignSection.css";

export type Alignment = 'left' | 'right' | 'none';

interface AlignSectionCfg {
    alignLeftStr: string;
    alignRightStr: string;
    alignCenterStr: string;
    title: string;
}
interface AlignSectionProps {
    cfg: AlignSectionCfg;
    onChange?: (alignment: Alignment) => void;
}

const AlignSection = (props: AlignSectionProps) => {
    const [alignment, setAlignment] = useState<Alignment>('none');

    return (
        <>
            <div className="align-section">
                <div className="align-section-title">{props.cfg.title}</div>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            id="float-left"
                            name="float"
                            value="left"
                            checked={alignment === "left"}
                            onChange={() => {
                                setAlignment("left");
                                if (props.onChange) {
                                    props.onChange("left");
                                }
                            }}
                        />
                        <span>{props.cfg.alignLeftStr}</span>
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            id="float-none"
                            name="float"
                            value="none"
                            checked={alignment === "none"}
                            onChange={() => {
                                setAlignment("none");
                                if (props.onChange) {
                                    props.onChange("none");
                                }
                            }}
                        />
                        <span>{props.cfg.alignCenterStr}</span>
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            id="float-right"
                            name="float"
                            value="right"
                            checked={alignment === "right"}
                            onChange={() => {
                                setAlignment("right");
                                if (props.onChange) {
                                    props.onChange("right");
                                }
                            }}
                        />
                        <span>{props.cfg.alignRightStr}</span>
                    </label>
                </div>
            </div>
        </>
    );
};

export default AlignSection;
