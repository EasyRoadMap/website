import styles from "./styles.module.css";

const transferControlDescription = (name) => {
  return (
    <span>
      Вы уверены что хотите передать <br /> управление рабочей областью <br />
      участнику
      <span className={styles.descriptionBolder}>{" " + name}?</span>
    </span>
  );
};
const removeParticipantDecsription = (name) => {
  return (
    <span>
      Вы уверены, что хотите исключить из
      <br /> рабочей области учаcтника
      <br />
      <span className={styles.descriptionBolder}>{" " + name}?</span>
    </span>
  );
};
const removeImageDecsription = () => {
  return (
    <span>Вы уверены, что хотите удалить текущее изображение проекта?</span>
  );
};
const removeStageDecsription = (stage) => {
  return (
    <span>
      Вы уверены, что хотите удалить этап
      <br />
      <span className={styles.descriptionBolder}>{" " + stage}?</span>
    </span>
  );
};
const removeTaskDecsription = (task) => {
  return (
    <span>
      Вы уверены, что хотите удалить задачу
      <br />
      <span className={styles.descriptionBolder}>{" " + task}?</span>
    </span>
  );
};
const askForExitFromWorkspace = (workspace) => {
  return (
    <span>
      Вы уверены, что хотите выйти из рабочей области
      <span className={styles.descriptionBolder}>{" " + workspace}?</span>
    </span>
  );
}
const askForDeleteWorkspace = (workspace) => {
  return (
    <span>
      Вы уверены, что хотите удалить рабочую область
      <span className={styles.descriptionBolder}>{" " + workspace}?</span>
    </span>
  );
}

export const transferControlProps = (name) => {
  return {
    type: "question",
    title: "Передать управление",
    description: () => transferControlDescription(name),
  };
};
export const removeParticipantProps = (name) => {
  return {
    type: "warn",
    title: "Исключить участника",
    description: () => removeParticipantDecsription(name),
  };
};
export const removeImageProps = () => {
  return {
    type: "warn",
    title: "Удалить изображение",
    description: removeImageDecsription,
  };
};
export const removeStageProps = (stage) => {
  return {
    type: "warn",
    title: "Удалить этап",
    description: () => removeStageDecsription(stage),
  };
};
export const removeTaskProps = (task) => {
  return {
    type: "warn",
    title: "Удалить задачу",
    description: () => removeTaskDecsription(task),
  };
};
export const askForExitFromWorkspaceProps = (workspace) => {
  return {
    type: "warn",
    title: "Выйти из рабочей области",
    description: () => askForExitFromWorkspace(workspace),
  };
};
export const askForDeleteWorkspaceProps = (workspace) => {
  return {
    type: "warn",
    title: "Удалить рабочую область",
    description: () => askForDeleteWorkspace(workspace),
  };
};
