import styles from "./errorWindow.module.css";
import Error from "../../assets/Error.jsx";
import Warn from "../../assets/WarnSVG.jsx";
import Done from "../../assets/doneSVG.jsx";
import ClosePopupSVG from "../../assets/closePopupSVG.jsx";

const errorType = {
  error: {
    name: "Ошибка!",
    icon: Error,
  },
  warn: {
    name: "Внимание!",
    icon: Warn,
  },
  done: {
    name: "Успех!",
    icon: Done,
  },
};
const errorsWindow = ({ type }) => {
  const IconComponent = errorType[type].icon;
  return (
    <>
      <div className={styles.errorsWrapper}>
        <div className={styles.errorsWindowInfo}>
          <IconComponent style={{ width: "30px", height: "30px" }} />
          <div className={styles.errorsInfo}>
            <span className={styles.errorsTitle}>{errorType[type].name}</span>
            <span className={styles.errorsText}>название ошибки</span>
          </div>
        </div>
        <div className={styles.closeButton}>
          {/* callback closes popup  */}
          <ClosePopupSVG />
        </div>
      </div>
    </>
  );
};

export default errorsWindow;
