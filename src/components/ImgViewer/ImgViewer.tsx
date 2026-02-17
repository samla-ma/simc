import { useState, useEffect } from "react";
// import MoveBtn from "./MoveBtn";
// import CloseBtn from "./CloseBtn";
//import "./ImgViewer.css";
import { FaCircleLeft, FaCircleRight, FaCircleXmark } from "react-icons/fa6";

const ImgViewer = ({ selectorStr }: { selectorStr: string }) => {
    //console.log("ImgViewer props:", { selectorStr });

    const [isVisible, setIsVisible] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(-1);
    const [attachmentList, setAttachmentList] = useState<
        { idx: number; url: string }[]
    >([]);

    useEffect(() => {
        const attachments: { idx: number; url: string }[] = [];
        if (selectorStr) {
            const images = document.querySelectorAll(selectorStr);
            images.forEach((img, index) => {
                let url = img.getAttribute("src");
                if (!url) {
                    url = img.getAttribute("href");
                }

                if (url) {
                    attachments.push({ idx: index, url: url });
                    img.addEventListener("click", (event) => {
                        event.preventDefault();
                        setCurrentIdx(index);
                        setIsVisible(true);
                    });
                }
            });
        } else {
            console.log("ImgViewer props: no selectorStr");
        }
        // console.log("attachements:", { attachments });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAttachmentList(attachments);

        // Cleanup
        // return () => {
        //     images.forEach((img) => {
        //         img.removeEventListener("click", () => {});
        //     });
        // };
    }, [selectorStr]);

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
            <div id="img-viewer-overlay" onClick={closeClick}>
                <div id="img-viewer-modal">
                    <div className="img-canvas">
                        <img
                            id="image"
                            src={
                                currentIdx >= 0
                                    ? attachmentList[currentIdx].url
                                    : ""
                            }
                            onClick={(event) => event.stopPropagation()}
                        />
                    </div>
                    <div className="btn-container" onClick={(event) => event.stopPropagation()}>
                        {
                            <>
                                <FaCircleLeft
                                    className={`img-viewer-btn ${currentIdx <= 0 ? "inactive" : ""}`}
                                    onClick={moveLeftClick}
                                />
                                <FaCircleXmark
                                    className="img-viewer-btn"
                                    onClick={closeClick}
                                />
                                <FaCircleRight
                                    className={`img-viewer-btn ${currentIdx >= attachmentList.length - 1 ? "inactive" : ""}`}
                                    onClick={moveRightClick}
                                />
                            </>
                            
                        }
                    </div>
                </div>
            </div>
        )
    );
};

export default ImgViewer;
