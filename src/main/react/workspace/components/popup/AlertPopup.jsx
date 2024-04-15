import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";

const logoByType = {
    error: "",
    question: "",
    warn: "",
    done: "",
    "error-warn": ""
}

const AlertPopup = ({
    type,
    title,
    description,
    close
}) => {
    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "yes" && nameButtonClicked !== "no") return;
        close(nameButtonClicked);
    }

    return (
        <>
            <div className={styles.logoWrapper}>
                <img src={logoByType[type]} alt="" />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description()}</div>
            </div>
            <div className={styles.buttons}>
                <Button className={styles.button} text="Да" type="outlineAccent" callback={() => handleClick("yes")}/>
                <Button className={styles.button} text="Нет" type="filledAccent" callback={() => handleClick("no")}/>
            </div>
        </>
    );
}

export default AlertPopup;