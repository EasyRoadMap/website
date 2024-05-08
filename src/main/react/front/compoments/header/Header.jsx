import HeaderLogo from "./HeaderLogo.jsx";
import ThemeChange from "./ThemeChange.jsx";
import styles from "./style.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
      <ThemeChange />
    </header>
  );
};

export default Header;
