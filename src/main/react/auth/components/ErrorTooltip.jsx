import styles from "./input.module.css";
import Error from "../../assets/Error.jsx";
import Triangle from "../../assets/TriangleForMessages.jsx";

export default function ErrorTooltip({errorText, isShown}) {
  return (
    <div className={styles.tooltip} style={{display: isShown ? "flex" : "none"}}>
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
