import styles from "./styles.module.css";

const transferControlDescription = (name) => {
  return (
    <span>
      Вы уверены что хотите передать <br /> управление рабочей областью <br />
      участнику
      <p className={styles.descriptionBolder}>{" " + name}?</p>
    </span>
  );
};
const removeParticipantDecsription = (name) => {
  return (
    <span>
      Вы уверены, что хотите исключить из
      <br /> рабочей области учаcтника
      <br />
      <p className={styles.descriptionBolder}>{" " + name}?</p>
    </span>
  );
};
const removeParticipantFromProjectDecsription = (name) => {
  return (
    <span>
      Вы уверены, что хотите исключить из
      <br /> проекта учаcтника
      <br />
      <p className={styles.descriptionBolder}>{" " + name}?</p>
    </span>
  );
};
const removeImageDecsription = () => {
  return <p>Вы уверены, что хотите удалить текущее изображение проекта?</p>;
};
const removeStageDecsription = (stage) => {
  return (
    <span>
      Вы уверены, что хотите удалить этап
      <br />
      <p className={styles.descriptionBolder}>{" " + stage}?</p>
    </span>
  );
};
const removeTaskDecsription = (task) => {
  return (
    <span>
      Вы уверены, что хотите удалить задачу
      <br />
      <p className={styles.descriptionBolder}>{" " + task}?</p>
    </span>
  );
};
const askForExitFromWorkspace = (workspace) => {
  return (
    <span>
      Вы уверены, что хотите выйти из рабочей области
      <p className={styles.descriptionBolder}>{" " + workspace}?</p>
    </span>
  );
};
const askForDeleteWorkspace = (workspace) => {
  return (
    <span>
      Вы уверены, что хотите удалить рабочую область
      <p className={styles.descriptionBolder}>{" " + workspace}?</p>
    </span>
  );
};
const askForDeleteStage = (stage) => {
  return (
    <span>
      Вы уверены, что хотите удалить этап
      <p className={styles.descriptionBolder}>{" " + stage}?</p>
    </span>
  );
};
const askForDeleteTask = (task) => {
  return (
    <span>
      Вы уверены, что хотите удалить задачу
      <p className={styles.descriptionBolder}>{" " + task}?</p>
    </span>
  );
};

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
export const removeParticipantFromProjectProps = (name) => {
  return {
    type: "warn",
    title: "Исключить участника",
    description: () => removeParticipantFromProjectDecsription(name),
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
export const askForDeleteStageProps = (stage) => {
  return {
    type: "warn",
    title: "Удалить этап",
    description: () => askForDeleteStage(stage),
  };
};
export const askForDeleteTaskProps = (task) => {
  return {
    type: "warn",
    title: "Удалить задачу",
    description: () => askForDeleteTask(task),
  };
};
