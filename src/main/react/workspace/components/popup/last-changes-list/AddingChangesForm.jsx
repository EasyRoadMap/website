import styles from "../styles.module.css";
import AddPhotoField from "./AddPhotoField.jsx";
import { useState } from "react";
import PhotoCropper from "../../cropper/PhotoCropper.jsx";

const AddingChangesForm = () => {
    const [files, setFiles] = useState([]);

    const addPhoto = (file) => {
        setFiles(prev => [...prev, file]);
    }

    return (
        <div className={styles.addPhotoFieldWrapper}>
            <div className={styles.photosList}>
                {files[0] && <PhotoCropper photo={files[0].URL}/>}
                {files.map((file, i) => {
                    return (
                        <img src={file.URL} alt="" className={styles.photo}/>
                    );
                })}
            </div>
            <AddPhotoField addPhoto={addPhoto}/>
        </div>
    );
}

export default AddingChangesForm;