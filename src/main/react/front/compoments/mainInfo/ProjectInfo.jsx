import styles from "./style.module.css";
import LinkSVG from "../../../assets/linkSVG.jsx";
const ProjectInfo = () => {
  return (
    <div className={styles.mainInfo}>
      <img src="" alt="" className={styles.projectAvatar}></img>
      <div className={styles.infoWrapper}>
        <span className={styles.infoTitle}>Название рабочей области</span>
        <span className={styles.infoDescription}>Описание рабочей области</span>
        <div className={styles.infoLinkWrapper}>
          <div className={styles.infoLink}>
            <LinkSVG />
            <span>Ссылка на соцсети</span>
          </div>
          <div className={styles.infoLink}>
            <LinkSVG />
            <span>Ссылка на соцсети</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
