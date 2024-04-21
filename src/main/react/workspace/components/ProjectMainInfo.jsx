import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";
import TextFieldDate from "./UI/TextFieldDate.jsx";
import TextFieldLink from "./UI/TextFieldLink.jsx";

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
          <TextField
            title="Описание проекта"
            placeholder="Описание проекта"
            type="textarea"
          />
          <label className={styles.titleInput}>Ссылки</label>
          <TextFieldLink />
          <TextFieldLink />
          <TextFieldLink />
          <label className={styles.titleInput}>Дата дедлайна</label>
          <TextFieldDate />
        </div>
      </div>
    </section>
  );
};

export default ProjectMainInfo;
