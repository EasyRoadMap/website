import styles from "./style.module.css";
import Button from "../UI/Button.jsx";

const ProjectItem = ({}) => {
  return (
    <div className={styles.projectItem}>
      <div className={styles.projectItemInfo}>
        <img src="" alt="" className={styles.projectItemAvatar}></img>
        <div className={styles.infoWrapper}>
          <div className={styles.infoTitle}>
            <div className={styles.projectItemTitle}>Название проекта</div>
            <div className={styles.projectItemDateWrapper}>
              {/* {Иконка календаря} */}
              <div className={styles.projectItemDate}>10.10.2020</div>
            </div>
          </div>

          <div className={styles.projectItemDesc}>Описание проекта</div>
        </div>
      </div>

      <Button
        text="Перейти"
        type="filledAccent"
        callback={() => {
          console.log("clicked");
        }}
        style={{ width: "608px", height: "40px" }}
      />
    </div>
  );
};

export default ProjectItem;
