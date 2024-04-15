import styles from "./styles.module.css";
import AddPhotoField from "./AddPhotoField.jsx";
import ChooseDate from "./ChooseDate.jsx";
import { useState, useRef } from "react";

const AddingChangesForm = () => {
    const [files, setFiles] = useState([]);

    const addPhoto = (files) => {
        setFiles(prev => [...prev, ...files]);
    }

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>
                Добавление изменения
            </h1>
            <h1 className={styles.changesTitle}>
                Заголовок изменения
            </h1>
            <div className={styles.changesDescription}>
                Описание изменения
            </div>
            <h2 className={styles.subTitle}>
                Вложения
            </h2>
            <div className={styles.photos}>
                {files.map((file, i) => {
                    return (
                        <div className={styles.photo}>
                            <img src={URL.createObjectURL(file)} alt=""/>
                        </div>
                    );
                })}
                <AddPhotoField addPhoto={addPhoto}/>
            </div>
            <h2 className={styles.subTitle}>
                Дата изменения
            </h2>
            <ChooseDate />
        </section>
    );
}

export default AddingChangesForm;