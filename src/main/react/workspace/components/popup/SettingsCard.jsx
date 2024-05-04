import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import DeleteSVG from "../../../assets/deleteSVG.jsx";
import KeySVG from "../../../assets/keySVG.jsx";

const IconSVGPopup = {
  changePassword: {
    iconSVG: KeySVG,
  },
  deleteAccount: {
    iconSVG: DeleteSVG,
  },
};

const SettingsCard = ({
  icon,
  name,
  descriptionComponent,
  buttonText,
  buttonType,
  callback,
}) => {
  const dataIcon = IconSVGPopup[icon];
  const IconComponent = dataIcon.iconSVG;
  return (
    <div className={styles.settingsCard}>
      <div className={styles.titleWrapper}>
        <IconComponent className={styles.icon} />
        <h1 className={styles.titleText}>{name}</h1>
      </div>
      {descriptionComponent()}
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
