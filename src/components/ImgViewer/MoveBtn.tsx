const MoveBtn = ({
    forward,
    active,
    onClick,
}: {
    forward: boolean;
    active: boolean;
    onClick?: () => void;
}) => {
    return (
        <>
            <div
                className={`img-viewer-btn img-viewer-btn-${forward ? "forward" : "backward"} ${active ? "" : "inactive"}`}
                onClick={active && onClick ? onClick : undefined}
            />
        </>
    );
};

export default MoveBtn;
