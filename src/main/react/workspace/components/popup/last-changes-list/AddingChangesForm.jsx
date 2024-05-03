import styles from "../styles.module.css";
import AddFileField from "./AddFileField.jsx";
import { useState } from "react";
import PhotoCropper from "../../cropper/PhotoCropper.jsx";

const AddingChangesForm = ({
  files,
  setFiles
}) => {
  const addFile = (file) => {
    setFiles((prev) => [...prev, file]);
  };

  return (
    <>
      <div className={styles.photosList}>
        {/* {files[0] && <PhotoCropper photo={files[0].URL} />} */}
        {files && files.map((file, i) => {
          return <img src={file.URL} alt="" className={styles.photo} />;
        })}
      </div>
      <AddFileField addFile={addFile} />
    </>
  );
};

export default AddingChangesForm;
