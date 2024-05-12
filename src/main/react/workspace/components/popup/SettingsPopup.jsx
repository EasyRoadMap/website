import styles from "./styles.module.css";
import SettingsCard from "./SettingsCard.jsx";
import { useState } from "react";

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
          icon="changePassword"
          name="Пароль"
          descriptionComponent={() => {
            return (
              <span className={styles.descriptionSetting}>
                После смены пароля вход в аккаунт должен будет осуществляться с новым паролем.
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
          icon="deleteAccount"
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
