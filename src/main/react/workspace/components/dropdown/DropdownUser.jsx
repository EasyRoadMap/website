import Button from "../UI/Button.jsx";
import styles from "./styles.module.css";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import UpdateProfilePopup from "../popup/UpdateProfilePopup.jsx";

const DropdownUser = ({ user, currentWorkspace, updateUser }) => {
  const popupManager = usePopupManager();

  const onUpdateProfile = (...params) => {
    if (!params[0].button === "save") return;
    if (!params[0].name) return;
    updateUser(params[0].name);
  };

  const openUpdateProfilePopup = (...params) => {
    if (!currentWorkspace?.info?.name) return;
    popupManager.open(Popup, {
      popup: {
        component: UpdateProfilePopup,
        props: {
          workspaceName: currentWorkspace?.info?.name
        }
      },
      onClose: onUpdateProfile,
    });
  };

  const avatarClassName = user?.photo?.default ? [styles.avatar, styles.pixelAvatar].join(" ") : styles.avatar;

  return (
    <div className={styles.userDropdown}>
      <img src={user?.photo?.url} alt="" className={avatarClassName} />
      <div className={styles.userInfoWrapper}>
        <div>
          <h1 className={styles.userName}>{user.name ? user.name : ""}</h1>
          <div className={styles.userEmail}>{user.email}</div>
        </div>
        <Button
          text="Мой профиль"
          type="outlineSecondary"
          className={styles.userButton}
          callback={openUpdateProfilePopup}
        />
      </div>
    </div>
  );
};

export default DropdownUser;
