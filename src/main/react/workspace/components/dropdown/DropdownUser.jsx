import Button from "../UI/Button.jsx";
import styles from "./styles.module.css";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import UpdateProfilePopup from "../popup/UpdateProfilePopup.jsx";

import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

const DropdownUser = ({ user, updateUser, hide }) => {
  const { workspaceContext } = useWorkspaceContext();
  const popupManager = usePopupManager();

  const onUpdateProfile = (...params) => {
    if (!params[0].button === "save") return;
    if (!params[0].name) return;
    updateUser(params[0].name);
  };

  const openUpdateProfilePopup = (...params) => {
    hide();
    popupManager.open(Popup, {
      popup: {
        component: UpdateProfilePopup,
        props: {
          userName: user.name
        }
      },
      onClose: onUpdateProfile,
    });
  };

  const avatarClassName = user?.photo?.default
    ? [styles.avatar, styles.pixelAvatar].join(" ")
    : styles.avatar;

  return (
    <div className={styles.userDropdown}>
      <img src={user?.photo?.url} alt="" className={avatarClassName} />
      <div className={styles.userInfoWrapper}>
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{user.name ? user.name : ""}</h1>
          <div className={styles.userEmail}>{user.email}</div>
        </div>
        <Button
          text="Мой профиль"
          type="outlineSecondary"
          className={styles.userButton}
          callback={openUpdateProfilePopup}
          style={{ width: "225px", height: "40px" }}
        />
      </div>
    </div>
  );
};

export default DropdownUser;
