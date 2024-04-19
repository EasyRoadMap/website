import styles from "./styles.module.css";
import ClosePopupSVG from "../../../assets/closePopupSVG.jsx";

const PopupBase = ({ isOpen, close, children }) => {
  return (
    <div
      className={styles.blurredScreen}
      style={isOpen ? {} : { display: "none" }}
    >
      <div className={styles.popup}>
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
