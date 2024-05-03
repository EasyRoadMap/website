import styles from "../styles.module.css";
import AddFileField from "./AddFileField.jsx";
import { useState } from "react";
import PhotoCropper from "../../cropper/PhotoCropper.jsx";

function formatBytes(a,b=2){if(!+a)return"0 B";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"][d]}`}

const AddingChangesForm = ({
  files,
  setFiles,
  chosenStage
}) => {
  console.debug("files",files);
  return (
    <>
      <div className={styles.photosList}>
        {/* {files[0] && <PhotoCropper photo={files[0].URL} />} */}
        {files && files.map((file, i) => {
          return (
            <>
            {
              file.file.type.split('/')[0] === 'image' &&
              <img src={file.url} alt="" className={styles.photo} />
            }
            {
              file.file.type.split('/')[0] !== 'image' &&
              <span>it's some unhandled file</span>
            }
            <span>{file.file.name}</span>
            <span>{formatBytes(file.file.size)}</span>
            </>
          )
        })}
      </div>
      <AddFileField setFiles={setFiles} chosenStage={chosenStage}/>
    </>
  );
};

export default AddingChangesForm;
