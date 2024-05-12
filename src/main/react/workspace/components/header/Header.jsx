import UserHeaderButton from "./UserHeaderButton.jsx";
import HeaderLogo from "./HeaderLogo.jsx";
import styles from "./styles.module.css";

import useUserContext from "../../hooks/useUserContext.js";

const Header = ({
    DeleteUser,
    UpdateUser,
    workspaces,
    currentWorkspace
}) => {
    const { userContext } = useUserContext();
    return (
        <header className={styles.header}>
            <HeaderLogo />
            <UserHeaderButton user={userContext}
                              DeleteUser={DeleteUser}
                              UpdateUser={UpdateUser}
                              currentWorkspace={currentWorkspace}
            />
        </header>
    );
}

export default Header;