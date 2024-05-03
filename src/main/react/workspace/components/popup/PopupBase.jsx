import styles from "./styles.module.css";
import ClosePopupSVG from "../../../assets/closePopupSVG.jsx";

const PopupBase = ({ isOpen, close, children }) => {
  return (
    <div
      className={styles.blurredScreen}
      style={isOpen ? {} : { display: "none" }}
    >
      <div
        className={styles.popup}
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        {children}
        <div className={styles.closeButton} onClick={close}>
          {/* callback closes popup  */}
          <ClosePopupSVG />
        </div>
      </div>
    </div>
  );
};

export default PopupBase;
