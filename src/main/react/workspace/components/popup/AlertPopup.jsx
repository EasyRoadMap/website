import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import WarnSVG from "../../../assets/WarnSVG.jsx";
import Error from "../../../assets/Error.jsx";
import Info from "../../../assets/infoSVG.jsx";
import Done from "../../../assets/doneSVG.jsx";
import ErrorWarn from "../../../assets/ErrorWarnSVG.jsx";

const logoByType = {
  error: Error,
  question: Info,
  warn: WarnSVG,
  done: Done,
  errorWarn: ErrorWarn,
};

const AlertPopup = ({ type, title, description, close }) => {
  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "yes" && nameButtonClicked !== "no") return;
    close(nameButtonClicked);
  };
  const IconComponentSVG = logoByType[type];

  return (
    <>
      <div className={styles.logoWrapper}>
        {/* <img src={logoByType[type]} alt="" /> */}
        <IconComponentSVG />
      </div>
      <div className={styles.info}>
        <div className={styles.titlePopup}>{title}</div>
        <div className={styles.descriptionPopup}>{description()}</div>
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          text="Да"
          type="outlineAccent"
          callback={() => handleClick("yes")}
        />
        <Button
          className={styles.button}
          text="Нет"
          type="filledAccent"
          callback={() => handleClick("no")}
        />
      </div>
    </>
  );
};

export default AlertPopup;
