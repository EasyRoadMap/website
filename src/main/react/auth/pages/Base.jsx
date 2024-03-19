import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";
import BackgroundSVG from "../../assets/BackgroundSVG.jsx";
import BackgroundPic from "..//../assets/Bacground.svg";

function Base({ header, children }) {
  return (
    <>
      <BackgroundSVG className={styles.backgroundSVG}></BackgroundSVG>
      <div className={styles.background}>
        <div className={styles.mainPage}>
          <Logo></Logo>
          <h1 className={styles.title}>{header}</h1>
          {children}
        </div>
      </div>
    </>
  );
}

export default Base;
