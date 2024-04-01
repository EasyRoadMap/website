import Logo from "../../../assets/Logo.jsx";
import styles from "./styles.module.css";

const HeaderLogo = () => {
  return (
    <div className={styles.logoWrapper}>
      <Logo className={styles.logo} />
      <div className={styles.titleWrapper}>
        <div className={styles.title}>EASYROADMAP</div>
        <div className={styles.subTitle}>личный кабинет</div>
      </div>
    </div>
  );
};

export default HeaderLogo;
