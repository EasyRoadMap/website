import styles from "./styles.module.css";
import SettingsCard from "./SettingsCard.jsx";

const SettingsPopup = ({ close }) => {
  const handleClick = (nameButtonClicked) => {
    if (
      nameButtonClicked !== "change-password" &&
      nameButtonClicked !== "delete-account"
    )
      return;
    close(nameButtonClicked);
  };

  return (
    <>
      <h1 className={styles.title}>Настройки</h1>
      <div className={styles.settingsWrapper}>
        <SettingsCard
          icon=""
          name="Пароль"
          descriptionComponent={() => {
            return (
              <span className={styles.descriptionSetting}>
                Последнее изменение:{" "}
                <span className={styles.bolder}>2 месяца назад</span>
              </span>
            );
          }}
          buttonText="Изменить пароль"
          buttonType="outlineAccent"
          callback={() => {
            handleClick("change-password");
          }}
        />
        <SettingsCard
          icon=""
          name="Удаление аккаунта"
          descriptionComponent={() => {
            return (
              <span className={styles.descriptionSetting}>
                Все ваши данные будут безвозвратно удалены!
              </span>
            );
          }}
          buttonText="Удалить аккаунт"
          buttonType="outlineError"
          callback={() => {
            handleClick("delete-account");
          }}
        />
      </div>
    </>
  );
};

export default SettingsPopup;
