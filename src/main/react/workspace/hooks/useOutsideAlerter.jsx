import { useEffect, useRef } from "react";

const useOutsideAlerter = (ref, excludeFieldRef, callback) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && 
                !ref.current.contains(event.target) && 
                !excludeFieldRef?.current?.contains(event.target)) 
            {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, excludeFieldRef, callback]);
}

export const OutsideAlerter = ({callback, ...props}) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props?.excludeFieldRef, callback);

    return <div ref={wrapperRef} style={props.style}>{props.children}</div>;
}
