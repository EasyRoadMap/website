import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";
import TextFieldDate from "./UI/TextFieldDate.jsx";
import TextFieldLink from "./UI/TextFieldLink.jsx";
import useProjectContext from "../hooks/useProjectContext.js";

const ProjectMainInfo = () => {
  const { projectContext } = useProjectContext();

  const avatarClassName = projectContext?.photo?.default ? [styles.logo, styles.pixelAvatar].join(" ") : styles.logo;
  
  return (
    <section className={styles.section} id="main">
      <span className={styles.title}>Основная информация</span>
      <div className={styles.info}>
        <img src={projectContext?.photo?.url} alt="" className={avatarClassName} />
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
