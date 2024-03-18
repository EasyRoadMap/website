import styles from "./styleLogo.module.css";
import LogoSVG from "../../assets/Logo.jsx";

export default function Logo() {
  return (
    <div className={styles.LogoWrapper}>
      {/* <div className={styles.logo}></div> */}
      <LogoSVG className={styles.logo}/>
      <h1 className={styles.TitleLogo}>
        EASY
        <br />
        ROAD
        <br/>
        MAP
      </h1>
    </div>
  );
}
