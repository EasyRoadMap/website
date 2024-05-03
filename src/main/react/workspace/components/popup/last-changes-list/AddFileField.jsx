import styles from "../styles.module.css";
import AddPhotoFieldSVG from "../../../../assets/addPhotoField.jsx";
import { useRef, useState } from "react";

import { useRoadmapInfo } from "../../../hooks/useRoadmap.js";
import useRoadmapContext from "../../../hooks/useRoadmapContext.js";

function AddFileField({ setFiles, chosenStage }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const { UploadAttachment } = useRoadmapInfo();

  const addFile = (file) => {
    console.debug("chosen stage", chosenStage, file.file);
    if (!chosenStage) return;
    UploadAttachment(chosenStage, file.file, (rmta_id) => {
      setFiles((prev) => [...prev, {rmta_id: rmta_id, file: file.file, url: file.URL}])
    });
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.debug("file info", file);
      addFile({ file: file, URL: URL.createObjectURL(file) });
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className={styles.addPhotoFieldInput}>
      <AddPhotoFieldSVG className={styles.addPhotoField} />
      <input
        className={styles.fileInput}
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleChange}
        // accept=".png,.jpg,.jpeg"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      />

      {/* Место лейбла */}

      {dragActive && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  );
}

export default AddFileField;

/* <label className={dragActive ? styles.dragActive : ""}>
          <div className={styles.addPhotoFieldText}>
            Перетащите изображение
            <br />
            или
            <br />
            <div className={styles.AddPhotoFieldLink} onClick={onButtonClick}>
              Выберите файл
            </div>
          </div>
        </label> */
