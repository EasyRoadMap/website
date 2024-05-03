import styles from "./style.module.css";
import Button from "../UI/Button.jsx";

const TypeDeleleButton = {
  deleteProject: {
    title: "Удалить проект",
    description: "Все ваши данные о проекте будут безвозвратно удалены!",
    className: "deleteProjectDescription",
  },
  // deleteAccount: {
  //   title: "Удалить аккаунт",
  //   description: "Все ваши данные будут безвозвратно удалены!",
  // },
  deleteWorkspace: {
    title: "Удалить рабочую область",
    description:
      "Все ваши данные о рабочей области будут безвозвратно удалены!",
    className: "deleteWorkspaceDescription",
  },
};

const DeleteButton = ({ typeButton, callback }) => {
  const data = TypeDeleleButton[typeButton];
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.title}>{data.title}</span>
          <span className={styles[data.className]}>{data.description}</span>
        </div>

        <div>
          <Button text={data.title} type="outlineError" callback={callback} />
        </div>
      </div>
    </div>
  );
};

export default DeleteButton;
