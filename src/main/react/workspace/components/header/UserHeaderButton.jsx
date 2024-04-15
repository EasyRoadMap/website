import styles from "./styles.module.css";
import Dropdown from "../dropdown/Dropdown.jsx";
import { useState, useRef } from "react";

const UserHeaderButton = ({
    name,
    workspaceName
}) => {
    const [dropdownShowed, setDropdownShowed] = useState(false);
    const showButton = useRef(null);

    const toggleDropdown = () => {
        setDropdownShowed((prev) => !prev);
    }

    return (
        <>
            <div className={styles.userButton} 
                onClick={toggleDropdown}
                ref={showButton}
            >
                <div className={styles.avatarCircle}></div>
                <div className={styles.logoTextWrapper}>
                    <div className={styles.username}>
                        {name}
                    </div>
                    <div className={styles.workspaceName}>
                        {workspaceName}
                    </div>
                </div>
            </div>
            <Dropdown visible={dropdownShowed} 
                    hide={() => setDropdownShowed(false)}
                    showButtonRef={showButton}
            />
        </>
    );
}

export default UserHeaderButton;