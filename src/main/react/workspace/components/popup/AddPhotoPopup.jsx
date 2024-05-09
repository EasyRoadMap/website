import styles from "./styles.module.css";
// import Cropper from "../cropper/Cropper.jsx";
import Button from "../UI/Button.jsx";
import { useState, useRef } from "react";

import { usePopupManager } from "react-popup-manager";
import Popup from "./Popup.jsx";
import SetPhotoPopup from "./SetPhotoPopup.jsx";
import AddPhotoFieldSVG from "../../../assets/addPhotoField.jsx";

const AddPhotoPopup = ({ close }) => {
    const [photo, setPhoto] = useState();

    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const popupManager = usePopupManager();

    const onCloseSetPhotoPopup = (...params) => {
        console.log(params);
        // if (params?.[0]?.button === "delete" && workspaceContext?.id && projectContext?.id) {
        //   DeleteProject(workspaceContext?.id, projectContext?.id, params?.[0].password);
        // }
    }

    const openSetPhotoPopup = (photo) => {
        console.debug("photo added", photo);
        popupManager.open(Popup, {
        popup: {
            component: SetPhotoPopup,
            props: {
                photo: photo
            }
        },
        onClose: onCloseSetPhotoPopup,
        });
    };

    const getFileType = (file) => {
        const fileMIMEType = file.type.split("/")[0];
        if (fileMIMEType === "image") {
          return "image";
        }
        return "other";
    }

    const addFile = (file) => {
        openSetPhotoPopup(file)
    };

    const handleFile = (file) => {
        if (getFileType(file) !== "image") return;
        addFile({ file: file, URL: URL.createObjectURL(file) });
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

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };
    
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleClick = (nameButtonClicked) => {
        if (
            nameButtonClicked !== "change-password" &&
            nameButtonClicked !== "delete-account"
        )
        return;
        close(nameButtonClicked);
    };

    return (
        <div className={styles.addPhotoFieldInput}>
          <AddPhotoFieldSVG className={styles.addPhotoField} />
          <input
            className={styles.fileInput}
            ref={inputRef}
            type="file"
            multiple={false}
            onChange={handleChange}
            accept=".png,.jpg,.jpeg"
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
          />
    
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
};

export default AddPhotoPopup;
