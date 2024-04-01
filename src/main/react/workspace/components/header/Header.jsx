import UserHeaderButton from "./UserHeaderButton.jsx";
import HeaderLogo from "./HeaderLogo.jsx";
import styles from "./styles.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <HeaderLogo />
            <UserHeaderButton name="Пользователь"/>
        </header>
    );
}

export default Header;