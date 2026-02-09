const CloseBtn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <>
      <div
        className={`img-viewer-btn img-viewer-btn-close`}
        onClick={onClick}
      />
    </>
  );
};

export default CloseBtn;
