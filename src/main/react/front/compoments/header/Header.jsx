import HeaderLogo from "./HeaderLogo.jsx";
import styles from "./style.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
      <div>Кнопки темы</div>
    </header>
  );
};

export default Header;
