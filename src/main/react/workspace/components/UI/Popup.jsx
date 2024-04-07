import styles from "./popup.module.css";
import Button from "./Button";

const logoByType = {
    error: "",
    question: "",
    warn: "",
    done: "",
    "error-warn": "",
    none: ""
}

const buttons = {
    question: (callbacks) => {
        <>
            <Button text="Нет" type="filledAccent" callback={callbacks.no}/>
            <Button text="Да" type="outlineAccent" callback={callbacks.yes}/>
        </>
    },
    warn: (callbacks) => {
        <>
            <Button text="Нет" type="filledAccent" callback={callbacks.no}/>
            <Button text="Да" type="outlineAccent" callback={callbacks.yes}/>
        </>
    },
    error: (callbacks) => {
        <>
            <Button text="Ок" type="filledAccent" callback={callbacks.ok}/>
        </>
    },
    none: (callbacks) => {
        <>
            <Button text="Готово" type="filledAccent" callback={callbacks.done}/>
        </>
    }
}

const Popup = ({
    type, // error/question/warn/done/error-warn
    title,
    description,
    callbacks
}) => {
    return (
        <div className={styles.blurredScreen}>
            <div className={styles.popup}>
                {logoByType[type] !== "none" && 
                    <div className={styles.logoWrapper}>
                        <img src={logoByType[type]} alt="" />
                    </div>
                }
                <div className={styles.info}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.title}>{description}</div>
                </div>
                <div className={styles.buttons}>
                    {buttons[type](callbacks)}
                </div>
            </div>
        </div>
    );
}

export default Popup;