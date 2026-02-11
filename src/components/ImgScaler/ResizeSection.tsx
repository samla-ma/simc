import "./ResizeSection.css";
interface ResizeSectionProps {
    optional?: boolean;
    initWidth: number;
    initHeight: number;
    maxWidth: number;
    maxHeight: number;
    widthStr: string;
    heightStr: string;
    title: string;
    action: string;
}

const ResizeSection = (props: ResizeSectionProps) => {
    return (
        <>
            <div className="resize-section">
                <div className="resize-section-title">
                    {props.optional ? (
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                className="resize-section-checkbox"
                            />
                            {props.title}
                        </label>
                    ) : (
                        props.title
                    )}
                </div>

                <div className="input-row">
                    <label>
                        {props.widthStr}
                        <input
                            className="number-input"
                            type="number"
                            min="1"
                            max={props.maxWidth}
                            name="width"
                            defaultValue={props.initWidth}
                        />
                    </label>
                    <label>
                        {props.heightStr}
                        <input
                            className="number-input"
                            type="number"
                            min="1"
                            name="height"
                            max={props.maxHeight}
                            defaultValue={props.initHeight}
                        />
                    </label>
                    <button type="button" className="apply-btn">
                        {props.action}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ResizeSection;
