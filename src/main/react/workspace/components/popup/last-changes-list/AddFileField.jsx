import styles from "../styles.module.css";
import AddPhotoFieldSVG from "../../../../assets/addPhotoField.jsx";
import { useRef, useState } from "react";

import { useRoadmapInfo } from "../../../hooks/useRoadmap.js";
import useRoadmapContext from "../../../hooks/useRoadmapContext.js";

const ARCHIVE_MIME_SUBTYPES = [
  "x-bzip", "x-bzip2", "gzip", "java-archive", "vnd.rar", "x-tar", "zip", "x-7z-compressed", 
  // "x-zip-compressed"
]


function AddFileField({ setFiles, chosenStage }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const { UploadAttachment } = useRoadmapInfo();

  const getFileType = (file) => {
    const fileMIMEType = file.type.split("/")[0];
    if (fileMIMEType === "application") {
      const fileMIMESubtype = file.type.split("/")[1];
      console.debug("fileMIMESubtype", fileMIMESubtype);
      if (ARCHIVE_MIME_SUBTYPES.includes(fileMIMESubtype)) return "archive";
    } else if (fileMIMEType === "image") {
      return "image";
    }
    return "default";
  }

  const addFile = (file) => {
    console.debug("chosen stage", chosenStage, file.file);
    if (!chosenStage) return;
    UploadAttachment(chosenStage, file.file, (rmta_id) => {
      setFiles((prev) => [...prev, {id: rmta_id, file: file.file, url: file.URL, type: getFileType(file.file), name: file.file.name}])
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
