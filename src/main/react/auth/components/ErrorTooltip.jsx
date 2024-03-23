import styles from "./input.module.css";
import Error from "../../assets/Error.jsx";
import Triangle from "../../assets/TriangleForMessages.jsx";
import { useState } from "react";

export default function ErrorTooltip({errorText, isShown, stylesFromOutside}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.tooltip} 
         onMouseEnter={() => setHovered(true)} 
         onMouseLeave={() => setHovered(false)}
         style={{display: (isShown || hovered) ? "flex" : "none", ...stylesFromOutside}
    }>
        <div className={styles.tooltipLogo}>
          <Error />
        </div>
        <span className={styles.tooltipText}>{errorText}</span>
        <Triangle 
            color="#FFFFFF"
            opacity={1}
            className={styles.tooltipTriangle}
        />
        <Triangle 
            color="#F1403A"
            className={styles.tooltipTriangle}
        />
    </div>
  );
}
