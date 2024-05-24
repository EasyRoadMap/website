import styles from "./noMobileVersion.module.css";
import Logo from "../../../assets/Logo.jsx";
import ExitMobileVersionSVG from "../../../assets/exitMobileVersionSVG.jsx";
import NoMobileVersionSVG from "../../../assets/noMobileVersionSVG.jsx";

const pagesFullNames = {
  "workspace": "Личный кабинет",
  "publicPage": "Страница посетителей"
}

const NoMobileVersion = ({
  pageName
}) => {

  const handleClick = () => {
    console.debug("clicked exit button");
    window.location.replace("/");
  }

  return (
    <div className={styles.noMobileVersionWrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
          <div className={styles.titleWrapper}>
            <div className={styles.title}>EASYROADMAP</div>
            <div className={styles.subTitle}>{pagesFullNames[pageName]}</div>
          </div>
        </div>
        <ExitMobileVersionSVG onClick={handleClick}/>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <div className={styles.noMobileVersionInfoWrapper}>
          <NoMobileVersionSVG />
          <div className={styles.noMobileVersionTextWrapper}>
            <span className={styles.noMobileVersionTextTitle}>
              Пока недоступно
            </span>
            <span className={styles.noMobileVersionTextDescription}>
              На данный момент личный <br />
              кабинет недоступен для <br />
              мобильных устройств!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoMobileVersion;
