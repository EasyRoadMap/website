import { useEffect, useRef } from "react";

const usePlaceFixedBlockToAnother = ( fixedBlock, targetBlock ) => {
    useEffect(() => {
        if (!fixedBlock.current || !targetBlock.current) return;

        const bottomSide = document.documentElement.clientHeight - (targetBlock.current.offsetTop * 2 + targetBlock.current.offsetHeight) + 6;
    
        fixedBlock.current.style.position = "fixed";
        // fixedBlock.current.style.left = leftSide + "px";
        console.log("asdsad");
        console.log("calc((100vw - 1060px) / 2 - " + fixedBlock.current.firstChild.firstChild.offsetWidth + "px)");
        fixedBlock.current.style.right = "calc((100vw - 1060px) / 2 + " + fixedBlock.current.firstChild.firstChild.offsetWidth + "px)";
        fixedBlock.current.style.bottom = bottomSide + "px"; 
    }, [fixedBlock, targetBlock]);
}

export const PlaceFixedBlockToAnother = ({targetBlock, ...props}) => {
    const wrapperRef = useRef(null);
    usePlaceFixedBlockToAnother(wrapperRef, targetBlock);

    return <div ref={wrapperRef}>{props.children}</div>;
}