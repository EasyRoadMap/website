import styles from "./input.module.css";
import Error from "../../assets/Error.jsx";

export default function ErrorPopup({errorText, isShown}) {
  return (
    <div className={styles.popup} style={{display: isShown ? "flex" : "none"}}>
        <div className={styles.popupLogo}>
          <Error />
        </div>
        <span className={styles.popupText}>{errorText}</span>
    </div>
  );
}
