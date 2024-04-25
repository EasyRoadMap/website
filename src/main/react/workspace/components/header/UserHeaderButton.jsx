import styles from "./styles.module.css";
import Dropdown from "../dropdown/Dropdown.jsx";
import { useState, useRef } from "react";
// import { useUserInfo } from "../../hooks/useUser.jsx";

// {
//     name,
//     workspaceName
// }
const UserHeaderButton = ({
    user,
    DeleteUser,
    UpdateUser,
    CreateWorkspace,
    currentWorkspace
}) => {
    const [dropdownShowed, setDropdownShowed] = useState(false);
    const showButton = useRef(null);
    // const { user, DeleteUser } = useUserInfo();

  const toggleDropdown = () => {
    setDropdownShowed((prev) => !prev);
  };

  const avatarClassName = user?.photo?.default ? [styles.avatarCircle, styles.pixelAvatar].join(" ") : styles.avatarCircle;

  return (
    <>
      <div
        className={styles.userButton}
        onClick={toggleDropdown}
        ref={showButton}
      >
        <img src={user?.photo?.url} alt="" className={avatarClassName}>
        </img>
      </div>
      <Dropdown
        visible={dropdownShowed}
        hide={() => setDropdownShowed(false)}
        showButtonRef={showButton}
        user={user}
        deleteUser={DeleteUser}
        updateUser={UpdateUser}
        createWorkspace={CreateWorkspace}
        currentWorkspace={currentWorkspace}
      />
    </>
  );
};

export default UserHeaderButton;
