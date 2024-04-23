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
      <span className={styles.descriptionBolder}>{" " + stage}?</span>
    </span>
  );
};
const removeTaskDecsription = (task) => {
  return (
    <span>
      Вы уверены, что хотите удалить задачу
      <span className={styles.descriptionBolder}>{" " + task}?</span>
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
