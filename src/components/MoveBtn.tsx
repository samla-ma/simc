//import { useState } from "react";
import "./MoveBtn.css";

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
      <img
        className={`move-btn ${active ? "active" : ""}`}
        src={forward ? "/images/arrow-right.webp" : "/images/arrow-left.webp"}
        alt={forward ? "Move Forward" : "Move Backward"}
        onClick={active && onClick ? onClick : undefined}
      />
    </>
  );
};

export default MoveBtn;
