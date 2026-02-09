import "./CloseBtn.css";

const CloseBtn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <>
      <img
        className="close-btn"
        src="/images/ugly.webp"
        alt="Close"
        onClick={onClick}
      />
    </>
  );
};

export default CloseBtn;
