import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";

const UpdateProfilePopup = ({
    workspaceName,
    close
}) => {
    const [name, setName] = useState("");

    console.log("propd");
    console.log(workspaceName);


    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "save") return;
        close({button: nameButtonClicked, name: name});
    }
    return (
        <div className={styles.popup}>
            <h1 className={styles.title}>
                Создать рабочую область
            </h1>
            <div className={styles.description}>
                Создайте новую рабочую область для будущих проектов и начинайте работу.
            </div>
            <div className={styles.containerWithGaps}>
                <Input data={name}
                       setData={setName}
                       placeholder={"Ваше имя"}
                       typeOfInput={"name"}
                />
                <div className={styles.description}>
                    <span>
                        Введите имя и загрузите фото, они будут отображаться в интерфейсе <span className={styles.bolder}>{ workspaceName }</span>
                    </span>
                </div>
            </div>
            <div className={styles.buttonsWrapper}>
                <Button text="Сохранить изменения" type="filledAccent" callback={() => handleClick("save")}/>
            </div>
        </div>
    );
}

export default UpdateProfilePopup;