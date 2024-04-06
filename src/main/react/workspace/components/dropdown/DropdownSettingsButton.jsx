import styles from "./styles.module.css";

const DropdownSettingsButton = ({
  type, // theme/settings/logout
  callback,
}) => {
  const IconComponent = type.icon;
  return (
    <>
      <div className={styles.dropdownSettings}>
        <IconComponent сlassName={styles.dropdownSettingsIcon} />
        <button className={styles.dropdownTitleButton} onClick={callback}>
          {type.text}
        </button>
      </div>
    </>
  );
};

export default DropdownSettingsButton;
