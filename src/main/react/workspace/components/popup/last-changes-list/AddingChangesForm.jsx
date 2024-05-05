import styles from "../styles.module.css";
import AddFileField from "./AddFileField.jsx";
import DeletePhotoInTaskSVG from "../../../../assets/deletePhotoInTaskSVG.jsx";
import DeleteTaskRoadmapSVG from "../../../../assets/deleteTaskRoadmapSVG.jsx";
import ZipFielIconSVG from "../../../../assets/zipFielIconSVG.jsx";
import UnhandledFieldIcon from "../../../../assets/unhandledFieldIconSVG.jsx";
import { useState } from "react";
import PhotoCropper from "../../cropper/PhotoCropper.jsx";

function formatBytes(a, b = 2) {
  if (!+a) return "0 B";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]
  }`;
}

const AddingChangesForm = ({ files, setFiles, chosenStage }) => {
  console.debug("files", files);

  const removeFile = (id) => {
    if (!files) return;
    console.debug(
      "file",
      files.filter((file, i) => {
        return i !== id;
      })
    );
    const newFilesList = files.filter((file, i) => {
      return i !== id;
    });
    setFiles(newFilesList);
  };

  return (
    <>
      <div className={styles.photosList}>
        {/* {files[0] && <PhotoCropper photo={files[0].URL} />} */}
        {files &&
          files.map((file, i) => {
            return (
              <div className={styles.photoWrapper}>
                {file.file.type.split("/")[0] === "image" && (
                  <div style={{ position: "relative" }}>
                    <DeleteTaskRoadmapSVG
                      className={styles.deletePhotoInTask}
                      onClick={() => removeFile(i)}
                    />
                    <img src={file.url} alt="" className={styles.photo} />
                  </div>
                )}
                {file.file.type.split("/")[0] !== "image" && (
                  <div style={{ position: "relative" }}>
                    <DeleteTaskRoadmapSVG
                      className={styles.deletePhotoInTask}
                      onClick={() => removeFile(i)}
                    />
                    <div className={styles.unhandledFile}>
                      {file.type === "archive" && (
                        <ZipFielIconSVG className={styles.fielIcon} />
                      )}
                      {file.type === "default" && (
                        <UnhandledFieldIcon className={styles.fielIcon} />
                      )}
                    </div>
                  </div>
                )}
                <div className={styles.photoInfo}>
                  <span className={styles.nameFile}>{file.name}</span>
                  <span className={styles.sizeFile}>
                    {formatBytes(file.file.size)}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <AddFileField setFiles={setFiles} chosenStage={chosenStage} />
    </>
  );
};

export default AddingChangesForm;
