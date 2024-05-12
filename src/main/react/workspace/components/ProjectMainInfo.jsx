import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";
import TextFieldDate from "./UI/TextFieldDate.jsx";
import TextFieldLink from "./UI/TextFieldLink.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
import CameraSVG from "../../assets/cameraSVG.jsx";
import Button from "./UI/Button.jsx";
import { useState, useEffect } from "react";

import { useProjectInfo } from "../hooks/useProject.jsx";

const ProjectMainInfo = ({
  initialValues,
  projectId
}) => {
  const [name, setName] = useState(initialValues?.name);
  const [description, setDescription] = useState(initialValues?.description);
  const [links, setLinks] = useState(initialValues?.links);
  const [date, setDate] = useState(initialValues?.date);

  const { projectContext } = useProjectContext();
  const { UpdateInfo, UpdateLinks } = useProjectInfo();

  const avatarClassName = projectContext?.photo?.default
    ? [styles.logo, styles.pixelAvatar].join(" ")
    : styles.logo;

  useEffect(() => {
    links.length
  }, [links]);

  const isDataChanged = () => {
    if (links?.length > 0) for (let i = 0; i < links.length; i++) {
      if ((links[i]?.name !== initialValues.links[i]?.name ||
          links[i]?.url !== initialValues.links[i]?.url) &&
          links[i]?.name && links[i]?.url) return true;
    }

    return !(
      name === initialValues?.name &&
      description === initialValues?.description &&
      date === initialValues?.date
    )
  }

  const changeData = () => {
    if (!projectContext?.id) return;
    if (
      name !== initialValues?.name ||
      description !== initialValues?.description ||
      date !== initialValues?.date
    ) {
      UpdateInfo(projectContext.id, name, description, date);
    } 
    if (!(
      links[0] === initialValues.links[0] &&
      links[1] === initialValues.links[1] &&
      links[2] === initialValues.links[2]
    )) {
      const names = [];
      const urls = [];
      links.forEach((link) => {
        if (link && link.name && link.url) {
          names.push(link.name);
          urls.push(link.url);
        }
      })
      if (names.length === urls.length) {
        UpdateLinks(projectContext.id, names, urls);
      }
    }
  }

  const isLinkInputShowing = (i) => {
    const areLinkValuesNull = !links[i-1]?.url || !links[i-1]?.name;
    return i === 0 || !(links[i-1] === null || areLinkValuesNull);
  }

  return (
    <section className={styles.section} id="main">
      <span className={styles.title}>Основная информация</span>
      <div className={styles.info}>
        <div className={styles.projectAvatar}>
          <img
            src={projectContext?.photo?.url}
            alt=""
            className={avatarClassName}
          />
          <div className={styles.projectAvatarWrapper}>
            <div className={styles.UserAvatarPlaceholder}>
              <CameraSVG />
            </div>
          </div>
        </div>

        <div className={styles.sectionUrl}>
          <TextField
            title="Название проекта"
            placeholder="Название проекта"
            data={name}
            setData={setName}
          />
          <TextField
            title="Описание проекта"
            placeholder="Описание проекта"
            type="textarea"
            data={description}
            setData={setDescription}
          />
          <label className={styles.titleInput}>Ссылки</label>
          {
            links && links.map((link, i) => {
              return (
                isLinkInputShowing(i) &&
                <TextFieldLink data={links} setData={setLinks} order={i} key={i} />
              );
            })
          }
          <label className={styles.titleInput}>Дата дедлайна</label>
          <TextFieldDate 
            data={date}
            setData={setDate}
          />
          {
            isDataChanged() &&
            <Button
              text={"Сохранить изменения"}
              type={"filledAccent"}
              callback={changeData}
            />
          }
        </div>
      </div>
    </section>
  );
};

export default ProjectMainInfo;
