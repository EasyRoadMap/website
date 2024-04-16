import styles from "../styles.module.css";
import AddPhotoField from "./AddPhotoField.jsx";
import { useState } from "react";

const AddingChangesForm = () => {
    const [files, setFiles] = useState([]);

    const addPhoto = (files) => {
        setFiles(prev => [...prev, ...files]);
    }

    return (
        <div className={styles.addPhotoFieldWrapper}>
            <div className={styles.photosList}>
                {files.map((file, i) => {
                    return (
                        <img src={URL.createObjectURL(file)} alt="" className={styles.photo}/>
                    );
                })}
            </div>
            <AddPhotoField addPhoto={addPhoto}/>
        </div>
    );
}

export default AddingChangesForm;