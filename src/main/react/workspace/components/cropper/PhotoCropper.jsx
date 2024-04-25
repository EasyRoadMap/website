import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";

const PhotoCropper = ({
    photo
}) => {
    const [circlePos, setCirclePos] = useState(null);
    const [canvasData, setCanvasData] = useState(null);
    const [mouseDown, setMouseDown] = useState(false);
    const [resizing, setResizing] = useState(false);

    const field = useRef(null);
    const canvas = useRef(null);
    const img = useRef(null);

    const canvasColor = "rgba(0, 0, 0, .35)";
    const canvasHeight = 400;
    const canvasWidth = 400;

    useEffect(() => {
        if (img.current && canvas.current) {
            console.log("eeeeeeeeeeeee");
            init(photo, img.current, canvas.current, {
                height: canvasHeight,
                width: canvasWidth
            });
        }
        return;
    }, [canvas, img]);

    useEffect(() => {
        if (canvasData) {
            redrawCircle();
        }
    }, [circlePos]);

    useEffect(() => {
        const handleMouseUp = (e) => {
            e.preventDefault();
            console.log("mouseUp");
            setMouseDown(false); 
            setResizing(false);
        }
          
        window.addEventListener('pointerup', handleMouseUp);
        
        return () => {
          window.removeEventListener('pointerup', handleMouseUp);
        }
      }, []);

    const scaleCircle = (x, y, side, e) => {
        let radius = circlePos.radius;

        let allowedSidesToScale = [
            "left", "right", "top", "bottom", "lb", "rb", "lt", "rt"
        ];

        const imgTop = img.current.offsetTop;
        const imgBottom = canvasHeight - imgTop;
        const imgLeft = img.current.offsetLeft;
        const imgRight = canvasWidth - imgLeft;

        if (circlePos.x - (circlePos.radius) <= imgLeft) {
            allowedSidesToScale = ["right", "rt", "rb"];
        } else if (circlePos.x + (circlePos.radius) >= imgRight) {
            allowedSidesToScale = ["left", "lt", "lb"];
        } else if (circlePos.y - (circlePos.radius) <= imgTop) {
            allowedSidesToScale = ["bottom", "rb", "lb"];
        } else if (circlePos.y + (circlePos.radius) >= imgBottom) {
            allowedSidesToScale = ["top", "rt", "lt"];
        }


        if (!(e.clientX - field.current.offsetLeft < img.current.offsetLeft + img.current.width && 
            e.clientX - field.current.offsetLeft > img.current.offsetLeft &&
            e.clientY - field.current.offsetTop < img.current.offsetTop + img.current.height && 
            e.clientY - field.current.offsetTop > img.current.offsetTop
        )) {
            console.log(e);
            console.log(img.current.offsetTop);
            console.log(img.current.offsetLeft + img.current.width);
            console.log(img.current.offsetTop + img.current.height);
             return;
        }
        
        if (side === "left") {
            radius = circlePos.x - x;
        } else if (side === "right") {
            radius = x - circlePos.x;
        } else if (side === "top") {
            radius = circlePos.y - y;
        } else if (side === "bottom") {
            radius = y - circlePos.y;
        } else {
            return;
        }   

        if (radius > 0 && !allowedSidesToScale.includes(side)) return;

        const minSide = img.current.width < img.current.height ? img.current.width : img.current.height;
        if (radius > minSide / 2) radius = minSide / 2;
        if (radius < 200 / canvasData.proportion) radius = 200 / canvasData.proportion;

        setCirclePos({
            ...circlePos,
            radius: radius
        })
    }

    const checkCircleHovering = (x, y) => {
        if (x > circlePos.x - circlePos.radius &&
            x < circlePos.x + circlePos.radius &&
            y > circlePos.y - circlePos.radius &&
            y < circlePos.y + circlePos.radius) {
            return true;
        }
        return false;
    } 

    const checkBordersHovering = (x, y) => {
        // left border
        if (x > circlePos.x - circlePos.radius - 5 &&
            x < circlePos.x - circlePos.radius + 5) {
                canvas.current.style.cursor = "ew-resize";
                return "left";
        }
        // right border 
        if (x > circlePos.x + circlePos.radius - 5 &&
            x < circlePos.x + circlePos.radius + 5) {
                canvas.current.style.cursor = "ew-resize";
                return "right";
        }
        // top border 
        if (y > circlePos.y - circlePos.radius - 5 &&
            y < circlePos.y - circlePos.radius + 5) {
                canvas.current.style.cursor = "ns-resize";
                return "top";
        }
        // bottom border 
        if (y > circlePos.y + circlePos.radius - 5 &&
            y < circlePos.y + circlePos.radius + 5) {
                canvas.current.style.cursor = "ns-resize";
                return "bottom";
        }
        canvas.current.style.cursor = "default";
        return false;
    }

    const redrawCircle = () => {
        const ctx = canvasData.context;
        const region = new Path2D();
    
        ctx.save();
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        region.rect(0, 0, canvasWidth, canvasHeight);
        region.arc(circlePos.x, circlePos.y, circlePos.radius, 0, Math.PI * 2);
        ctx.clip(region, "evenodd")
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }

    const init = (uploadedPhoto, img, canvas) => {
        const viewportHeight = canvasHeight;
        const viewportWidth = canvasWidth;
        const ctx = canvas.getContext("2d");
        const region = new Path2D();
    
        const photoSizes = {
            width: 0.0,
            height: 0.0,
            left: 0.0,
            top: 0.0,
            proportion: 1.0
        }
    
        img.src = uploadedPhoto;
        img.onload = () => {
            photoSizes.height = img.height;
            photoSizes.width = img.width;
    
            canvas.width = viewportWidth;
            canvas.height = viewportHeight;
    
            const aspectRatio = photoSizes.height / photoSizes.width;
        
            if (img.width < img.height) {
                photoSizes.proportion = img.height / viewportHeight;
                photoSizes.height = viewportHeight;
                photoSizes.width = ( 1 / aspectRatio ) * photoSizes.height;
                photoSizes.left = (viewportWidth - photoSizes.width) / 2;
            } else {
                photoSizes.proportion = img.width / viewportWidth;
                photoSizes.width = viewportWidth;
                photoSizes.height = aspectRatio * photoSizes.width;
                photoSizes.top = (viewportHeight - photoSizes.height) / 2;
            }
            img.height = photoSizes.height;
            img.width = photoSizes.width;
            img.style.top = photoSizes.top + "px";
            img.style.left = photoSizes.left + "px";
    
            const shortestSide =  photoSizes.height < photoSizes.width ? photoSizes.height : photoSizes.width;
            const radius = shortestSide / 2 - 50;
            if (radius > viewportWidth / 2 - 50) radius = viewportWidth / 2 - 50;

            setCirclePos({
                x: viewportWidth / 2,
                y: viewportWidth / 2,
                radius: radius   
            });
    
            setCanvasData({
                context: ctx,
                region: region,
                proportion: photoSizes.proportion
            });
        }
    }

    const handleMouseDown = (e) => {
        e.preventDefault();
        console.log("mouseDown");
        setMouseDown(true);

        const x = e.clientX - field.current.offsetLeft;
        const y = e.clientY - field.current.offsetTop;
        setResizing(checkBordersHovering(x, y));
    }
    const handleMouseMove = (e) => {
        e.preventDefault();

        let x = e.clientX - field.current.offsetLeft;
        let y = e.clientY - field.current.offsetTop;

        checkBordersHovering(x, y);

        if(mouseDown && field.current)
        {
            if (resizing) {
                scaleCircle(x, y, resizing, e);
            }
            else if (checkCircleHovering(x, y)) {
                const imgTop = img.current.offsetTop;
                const imgBottom = canvasHeight - imgTop;
                const imgLeft = img.current.offsetLeft;
                const imgRight = canvasWidth - imgLeft;

                if (x - (circlePos.radius) < imgLeft) x = imgLeft + circlePos.radius;
                if (x + (circlePos.radius) > imgRight) x = imgRight - circlePos.radius;
                if (y - (circlePos.radius) < imgTop) y = imgTop + circlePos.radius;
                if (y + (circlePos.radius) > imgBottom) y = imgBottom - circlePos.radius;

                setCirclePos({
                    ...circlePos,
                    x: x,
                    y: y,
                });
                return;
            }
        }
    }

    return (
        <>
            <div style={{width: '400px', height: '400px', position: "relative", border: "1px solid black"}} ref={field}>
                <img className="image" style={{ position: "absolute"}} ref={img}/>
                <canvas ref={canvas} style={{ position: "absolute"}}
                        onPointerDown={handleMouseDown}
                        onPointerMove={handleMouseMove}
                ></canvas>
            </div>
        </>
    );
}

export default PhotoCropper;