import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";

const ProjectMainInfo = ({
  logo,
  projectInfo, // name, description, links
}) => {
  return (
    <section className={styles.section} id="main">
      <span className={styles.title}>Основная информация</span>
      <div className={styles.info}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.sectionUrl}>
          <TextField title="Название проекта" placeholder="Название проекта" />
          <TextField title="Описание проекта" placeholder="Описание проекта" type="textarea"/>
          <TextField title="Ссылки" placeholder="Ссылка 1" />
          <TextField placeholder="Ссылка 2" />
          <TextField placeholder="Ссылка 3" />
        </div>
      </div>
    </section>
  );
};

export default ProjectMainInfo;
