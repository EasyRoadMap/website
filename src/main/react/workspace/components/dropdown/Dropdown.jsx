import DropdownUser from "./DropdownUser.jsx";
import DropdownWorkspaces from "./DropdownWorkspaces.jsx";
import DropdownSettingsButton from "./DropdownSettingsButton.jsx";
import styles from "./styles.module.css";
import { OutsideAlerter } from "../../hooks/useOutsideAlerter.jsx";
import { PlaceFixedBlockToAnother } from "../../hooks/usePlaceFixedBlockToAnother.jsx";
import { useRef } from "react";
import SettingsSvg from "../../../assets/settingsIconSVG.jsx";
import ExitSVG from "../../../assets/exitIconSVG.jsx";

const user = {
  avatar: "",
  name: "Пользователь",
  email: "user.email@domain.ru",
};
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

const workspaces = [
  { avatar: "", name: "Первая область" },
  { avatar: "", name: "Вторая область" },
];

const Dropdown = ({ visible, hide, showButtonRef }) => {
  const dropdown = useRef();

  // usePlaceFixedBlockToAnother(dropdown, showButtonRef);

  if (visible)
    return (
      <PlaceFixedBlockToAnother targetBlock={showButtonRef}>
        <OutsideAlerter
          callback={hide}
          excludeFieldRef={showButtonRef}
          style={{ position: "fixed" }}
        >
          <section className={styles.dropdown}>
            <DropdownUser user={user} />
            <DropdownWorkspaces workspaces={workspaces} />
            <div className={styles.dropdownButtons}>
              <DropdownSettingsButton type={typeButton.settings} />
              <DropdownSettingsButton type={typeButton.exit} />
            </div>
          </section>
        </OutsideAlerter>
      </PlaceFixedBlockToAnother>
    );
};

export default Dropdown;
