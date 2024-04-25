import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const SettingsCard = ({
  icon,
  name,
  descriptionComponent,
  buttonText,
  buttonType,
  callback,
}) => {
  return (
    <div className={styles.settingsCard}>
      <div className={styles.titleWrapper}>
        <img src={icon} alt="" className={styles.titleIcon} />
        <h1 className={styles.titleText}>{name}</h1>
      </div>
      {descriptionComponent}
      <Button
        text={buttonText}
        type={buttonType}
        callback={callback}
        style={{
          width: "186px",
          height: "30px",
          fontSize: "16px",
          fontWeight: "500",
          padding: "0",
        }}
      />
    </div>
  );
};

export default SettingsCard;
