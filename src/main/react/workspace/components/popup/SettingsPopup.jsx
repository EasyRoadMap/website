import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import SettingsCard from "./SettingsCard.jsx";

const SettingsPopup = ({
    close
}) => {
    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create") return;
        close(nameButtonClicked);
    }
    
    return (
        <div className={styles.popup}>
            <h1 className={styles.title}>
                Настройки
            </h1>
            <div className={styles.settingsWrapper}>
                <SettingsCard 
                    icon=""
                    name="Пароль"
                    descriptionComponent = {() => {
                        return <span className={styles.description}>Последнее изменение:{" "}<span className={styles.bolder}>2 месяца назад</span></span>
                    }}
                    buttonText="Изменить пароль"
                    buttonType="outlineAccent"
                    callback={() => {}}
                />
                <SettingsCard 
                    icon=""
                    name="Удаление аккаунта"
                    descriptionComponent = {() => {
                        return <span className={styles.description}>Все ваши данные будут безвозвратно удалены!</span>
                    }}
                    buttonText="Удалить аккаунт"
                    buttonType="outlineError"
                    callback={() => {}}
                />
            </div>
        </div>
    );
}

export default SettingsPopup;