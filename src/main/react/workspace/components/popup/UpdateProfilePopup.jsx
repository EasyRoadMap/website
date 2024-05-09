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

const UpdateProfilePopup = ({ workspaceName, close }) => {
  const [name, setName] = useState("");
  const {} = useUserInfo();
  const { userContext } = useUserContext();


  const popupManager = usePopupManager();

  const onAddPhotoPopup = (...params) => {
    console.log(params);
    // if (params?.[0]?.button === "delete" && workspaceContext?.id && projectContext?.id) {
    //   DeleteProject(workspaceContext?.id, projectContext?.id, params?.[0].password);
    // }
  }

  const openAddPhotoPopup = () => {
    console.debug("opening");
    popupManager.open(Popup, {
      popup: {
        component: AddPhotoPopup
      },
      onClose: onAddPhotoPopup,
    });
  };

  console.log("propd");
  console.log(workspaceName);

  const handleClick = (nameButtonClicked) => {
    if (nameButtonClicked !== "save") return;
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
          <div className={styles.UserAvatarWrapper} onClick={openAddPhotoPopup}>
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
