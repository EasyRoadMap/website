import styles from "../styles.module.css";
import AddPhotoFieldSVG from "../../../../assets/addPhotoField.jsx";
import { useRef, useState } from "react";

// drag drop file component
function AddPhotoField({
    addPhoto
}) {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const inputRef = useRef(null);

    // handle drag events
    const handleDrag = function(e) {
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
            addPhoto({file: file, URL: URL.createObjectURL(file)});
        }
    }

    // triggers when file is dropped
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

  return (
    <>
      <AddPhotoFieldSVG className={styles.addPhotoField} />
      <form
        className={styles.addPhotoFieldForm}
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className={styles.fileInput}
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".png,.jpg,.jpeg"
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
      </form>
    </>
  );
}

export default AddPhotoField;

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
