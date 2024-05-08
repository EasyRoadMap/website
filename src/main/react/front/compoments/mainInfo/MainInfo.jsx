import styles from "./style.module.css";
const MainInfo = () => {
  return (
    <div className={styles.mainInfo}>
      <img src="" alt="" className={styles.projectAvatar}></img>
      <div className={styles.infoWrapper}>
        <span className={styles.infoTitle}>Название рабочей области</span>
        <span className={styles.infoDescription}>Описание рабочей области</span>
      </div>
    </div>
  );
};

export default MainInfo;
