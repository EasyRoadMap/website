import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";
import { useState, useEffect } from "react";

const WorkspaceMainInfo = ({
  logo,
  initialValues
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [nameLoading, setNameLoading] = useState(initialValues.waitUntilLoadName);
  // const [descriptionLoading, setDescriptionLoading] = useState(initialValues.waitUntilLoadDescription);

  // useEffect(() => {
  //   console.log("GGGGGGGGGGGGGGGGGGGG");
  //   console.log(initialValues.isLoading);
  //   setName(initialValues.name);
  //   setDescription(initialValues.description);
  // }, [initialValues.isLoading]);

  const avatarClassName = logo?.default ? [styles.logo, styles.pixelAvatar].join(" ") : styles.logo;

  return (
    <section className={styles.section}>
      <span className={styles.title}>Основная информация</span>
      <div className={styles.info}>
        <img src={logo?.url} alt="" className={avatarClassName} />
        <div className={styles.infoDiscription}>
          <TextField title="Название" placeholder="Название рабочей области" data={name} setData={setName} 
                      disabled={initialValues.isLoading}/>
          <TextField title="Описание" placeholder="Описание рабочей области" data={description} setData={setDescription}
                      disabled={initialValues.isLoading}/>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceMainInfo;
