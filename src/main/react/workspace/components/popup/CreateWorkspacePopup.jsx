import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import { useState } from "react";

const CreateWorkspacePopup = ({
    close
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleClick = (nameButtonClicked) => {
        if (nameButtonClicked !== "cancel" && nameButtonClicked !== "create") return;
        close({button: nameButtonClicked,
               name: name,
               description: description
        });
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
                       placeholder={"Введите название"}
                       typeOfInput={"nameRegion"}
                />
                <Input data={description}
                       setData={setDescription}
                       placeholder={"Введите описание"}
                       typeOfInput={"descriptionRegion"}
                />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button text="Отмена" type="outlineSecondary" callback={() => handleClick("cancel")}/>
                <Button text="Создать" type="filledAccent" callback={() => handleClick("create")}/>
            </div>
        </div>
    );
}

export default CreateWorkspacePopup;