import "./AlignSection.css";
interface AlignSectionProps {
    alignLeftStr: string;
    alignRightStr: string;
    alignCenterStr: string;
    title: string;
}

const AlignSection = (props: AlignSectionProps) => {
    return (
        <>
            <div className="align-section">
                <div className="align-section-title">{props.title}</div>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            id="float-left"
                            name="float"
                            value="left"
                        />
                        <span>{props.alignLeftStr}</span>
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            id="float-none"
                            name="float"
                            value="none"
                            checked
                        />
                        <span>{props.alignCenterStr}</span>
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            id="float-right"
                            name="float"
                            value="right"
                        />
                        <span>{props.alignRightStr}</span>
                    </label>
                </div>
            </div>
        </>
    );
};

export default AlignSection;
