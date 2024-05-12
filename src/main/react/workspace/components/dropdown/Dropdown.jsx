import DropdownUser from "./DropdownUser.jsx";
import DropdownWorkspaces from "./DropdownWorkspaces.jsx";
import DropdownSettingsButton from "./DropdownSettingsButton.jsx";
import styles from "./styles.module.css";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { PlaceFixedBlockToAnother } from "../../hooks/usePlaceFixedBlockToAnother.jsx";
import { useRef, useEffect } from "react";
import SettingsSvg from "../../../assets/settingsIconSVG.jsx";
import ExitSVG from "../../../assets/exitIconSVG.jsx";
import ThemeButton from "../UI/ThemeButton.jsx";

import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import SettingsPopup from "../popup/SettingsPopup.jsx";
import DeleteAccountPopup from "../popup/DeleteAccountPopup.jsx";

import { logout } from "../../api/user-api/logout.js";

import useUserContext from "../../hooks/useUserContext.js";

const typeButton = {
  exit: {
    text: "Выход",
    icon: ExitSVG,
  },
  settings: {
    text: "Настройки",
    icon: SettingsSvg,
  },
};

const logoutAndExit = () => {
  logout().then((response) => {
    window.location.replace("/auth/sign-in");
  }).catch((e) => {
    console.log("error happened while logout");
  })
}

const Dropdown = ({ visible, hide, showButtonRef, user, deleteUser, updateUser, currentWorkspace }) => {
  const dropdown = useRef();

  const { userContext } = useUserContext();
  const popupManager = usePopupManager();

  useEffect(() => {
    console.debug("usercontext updated in dropdown", userContext);
  }, [userContext]);

  const onCloseSettingsPopup = (...params) => {
    if (params[0] === "change-password") console.log("clicked change paswword");
    else if (params[0] === "delete-account") openAskForDeletionPopup();
  };

  const onCloseDeleteAccountPopup = (...params) => {
    // console.log("closed");
  };

  const openSettingsPopup = () => {
    hide();
    popupManager.open(Popup, {
      popup: {
        component: SettingsPopup
      },
      onClose: onCloseSettingsPopup,
    });
  };

  const openAskForDeletionPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: DeleteAccountPopup,
        props: {
          deleteUser: deleteUser
        }
      },
      onClose: onCloseDeleteAccountPopup,
    });
  };

  if (visible)
    return (
      <PlaceFixedBlockToAnother targetBlock={showButtonRef}>
        <OutsideAlerter
          callback={hide}
          excludeFieldRef={showButtonRef}
          style={{ position: "fixed" }}
        >
          <section className={styles.dropdown}>
            <DropdownUser user={user} updateUser={updateUser} hide={hide} />
            <DropdownWorkspaces workspaces={userContext.workspaces} hide={hide}/>
            <div className={styles.dropdownButtons}>
              <ThemeButton />
              <DropdownSettingsButton type={typeButton.settings} callback={openSettingsPopup} />
              <DropdownSettingsButton type={typeButton.exit} callback={logoutAndExit}/>
            </div>
          </section>
        </OutsideAlerter>
      </PlaceFixedBlockToAnother>
    );
};

export default Dropdown;
