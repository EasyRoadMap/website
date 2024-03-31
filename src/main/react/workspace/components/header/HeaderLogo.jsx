import Logo from "../../../assets/Logo.jsx";
import styles from "./styles.module.css";

const HeaderLogo = () => {
    return (
        <div className={styles.logoWrapper}>
            <Logo className={styles.logo}/>
            EASYROADMAP
        </div>
    );
}

export default HeaderLogo;