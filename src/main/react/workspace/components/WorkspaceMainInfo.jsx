import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";

const WorkspaceMainInfo = ({
  logo,
  workspaceInfo, // name, description, links
}) => {
  return (
    <section className={styles.section}>
      <span className={styles.title}>Основная информация</span>
      <div className={styles.info}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.infoDiscription}>
          <TextField title="Название" placeholder="Название рабочей области" />
          <TextField title="Описание" placeholder="Описание рабочей области" />
        </div>
      </div>
    </section>
  );
};

export default WorkspaceMainInfo;
