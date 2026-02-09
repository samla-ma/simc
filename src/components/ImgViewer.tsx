import { useState } from "react";
import "./ImgViewer.css";
import MoveBtn from "./MoveBtn";
import CloseBtn from "./CloseBtn";

const ImgViewer = ({ selectorStr }: { selectorStr: string }) => {
    console.log("ImgViewer props:", { selectorStr });

    const [isVisible, setIsVisible] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(-1);

    const attachments: { idx: number; url: string }[] = [];
    if (selectorStr) {
        document.querySelectorAll(selectorStr).forEach((img, index) => {
            let url = img.getAttribute("src");
            if (!url) url = img.getAttribute("href");

            if (url) {
                attachments.push({ idx: index, url: url });
                img.addEventListener("click", () => {
                    setCurrentIdx(index);
                    setIsVisible(true);
                });
            }
        });
    } else {
        console.log("ImgViewer props: no selectorStr");
    }

    const [attachmentList] = useState(attachments);

    const moveLeftClick = () => {
        setCurrentIdx((prev) => Math.max(prev - 1, 0));
    };

    const moveRightClick = () => {
        setCurrentIdx((prev) => Math.min(prev + 1, attachmentList.length - 1));
    };

    const closeClick = () => {
        setIsVisible(false);
        setCurrentIdx(-1);
    };

    return (
        isVisible && (
            <>
                <div className="img-canvas">
                    <img
                        id="image"
                        src={
                            currentIdx >= 0
                                ? attachmentList[currentIdx].url
                                : ""
                        }
                    />
                </div>

                <div className="btn-container">
                    <MoveBtn
                        forward={false}
                        active={currentIdx > 0}
                        onClick={moveLeftClick}
                    />
                    <CloseBtn onClick={closeClick} />
                    <MoveBtn
                        forward={true}
                        active={currentIdx < attachmentList.length - 1}
                        onClick={moveRightClick}
                    />
                </div>
            </>
        )
    );
};

export default ImgViewer;
