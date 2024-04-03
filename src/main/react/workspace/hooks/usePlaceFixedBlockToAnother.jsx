import { useEffect, useRef } from "react";

const usePlaceFixedBlockToAnother = ( fixedBlock, targetBlock ) => {
    useEffect(() => {
        if (!fixedBlock.current || !targetBlock.current) return;

        const leftSide = targetBlock.current.offsetLeft + targetBlock.current.offsetWidth - fixedBlock.current.firstChild.firstChild.offsetWidth;
        const bottomSide = document.documentElement.clientHeight - (targetBlock.current.offsetTop * 2 + targetBlock.current.offsetHeight) - 10;
    
        fixedBlock.current.style.position = "fixed";
        fixedBlock.current.style.left = leftSide + "px";
        fixedBlock.current.style.bottom = bottomSide + "px"; 
    }, [fixedBlock, targetBlock]);
}

export const PlaceFixedBlockToAnother = ({targetBlock, ...props}) => {
    const wrapperRef = useRef(null);
    usePlaceFixedBlockToAnother(wrapperRef, targetBlock);

    return <div ref={wrapperRef}>{props.children}</div>;
}