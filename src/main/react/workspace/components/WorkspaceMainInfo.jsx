import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";
import { useState, useEffect } from "react";

const WorkspaceMainInfo = ({
  logo,
  initialValues
}) => {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);

  useEffect(() => {
    console.debug("initialValues", initialValues.workspace);
  }, []);

  const avatarClassName = logo?.default ? [styles.logo, styles.pixelAvatar].join(" ") : styles.logo;

  if (initialValues) {
    return (
      <section className={styles.section}>
        <span className={styles.title}>Основная информация</span>
        <div className={styles.info}>
          <img src={logo?.url} alt="" className={avatarClassName} />
          <div className={styles.infoDiscription}>
            <TextField title="Название" placeholder="Название рабочей области" data={name} setData={setName} 
                        loading={!initialValues.name}/>
            <TextField title="Описание" placeholder="Описание рабочей области" data={description} setData={setDescription}
                        loading={!initialValues.name}/>
          </div>
        </div>
      </section>
    );
  }
};

export default WorkspaceMainInfo;
