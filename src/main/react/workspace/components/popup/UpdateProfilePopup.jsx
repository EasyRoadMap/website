import styles from "./styles.module.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import CameraSVG from "../../../assets/cameraSVG.jsx";
import { useState } from "react";
import { useUserInfo } from "../../hooks/useUser.jsx";
import useUserContext from "../../hooks/useUserContext.js";

import { usePopupManager } from "react-popup-manager";
import Popup from "./Popup.jsx";
import AddPhotoPopup from "./AddPhotoPopup.jsx";

import { validateName } from "../../errors/validation.js";


const UpdateProfilePopup = ({ close, userName }) => {
  const [name, setName] = useState(userName);
  const {} = useUserInfo();
  const { userContext } = useUserContext();

  const [errorName, setErrorName] = useState(false);

  const popupManager = usePopupManager();

  const onAddPhotoPopup = (...params) => {
    console.log(params);
    // if (params?.[0]?.button === "delete" && workspaceContext?.id && projectContext?.id) {
    //   DeleteProject(workspaceContext?.id, projectContext?.id, params?.[0].password);
    // }
  }

  const validate = () => {
    const nameValidationResult = validateName(name, "user");

    if (nameValidationResult !== "passed") {
      setErrorName(nameValidationResult);
      return false;
    }
    return true;
  }

  const openAddPhotoPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: AddPhotoPopup
      },
      onClose: onAddPhotoPopup,
    });
  };

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "save") return;
    if (!validate()) return;
    close({ button: nameButtonClicked, name: name });
  };

  const avatarClassName = userContext?.photo?.default
    ? [styles.UserAvatar, styles.pixelAvatar].join(" ")
    : styles.UserAvatar;

  return (
    <>
      <div className={styles.containerWithUser}>
        <h1 className={styles.title}>Мой профиль</h1>

        <div className={styles.containerInfoUser}>
          <div className={styles.UserAvatarWrapper}>
            <img src={userContext?.photo?.url} alt="" className={avatarClassName} ></img>
            <div className={styles.userAvatarDiv}>
              <div className={styles.UserAvatarPlaceholder}>
                <CameraSVG />
              </div>
            </div>
          </div>
          <div className={styles.containerWithInputUser}>
            <Input
              data={name}
              setData={setName}
              placeholder={"Ваше имя"}
              typeOfInput={"name"}
              error={errorName}
              clearError={() => setErrorName("")}
            />
            <div className={styles.descriptionUser}>
              <span>
                Введите имя и загрузите фото, они будут <br /> отображаться в
                интерфейсе <span className={styles.bolder}>EasyRoadMap</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <Button
          text="Сохранить изменения"
          type="filledAccent"
          callback={() => handleClick("save")}
          style={{ width: "265px", height: "40px", padding: "0" }}
        />
      </div>
    </>
  );
};

export default UpdateProfilePopup;
