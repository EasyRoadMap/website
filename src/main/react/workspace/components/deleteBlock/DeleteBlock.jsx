import styles from "./style.module.css";
import Button from "../UI/Button.jsx";


const TypeDeleleButton = {
  deleteProject: {
    title: "Удалить проект",
    description: "Все ваши данные о проекте будут безвозвратно удалены!",
  },
  deleteAccount: {
    title: "Удалить аккаунт",
    description: "Все ваши данные будут безвозвратно удалены!",
  },
  deleteWorkspace: {
    title: "Удалить рабочую область",
    description:
      "Все ваши данные о рабочей области будут безвозвратно удалены!",
  },
};

const DeleteButton = ({ typeButton, callback }) => {
  const data = TypeDeleleButton[typeButton];
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.title}>{data.title}</span>
          <span className={styles.description}>{data.description}</span>
        </div>

        <div>
          <Button text={data.title} type="outlineError" callback={callback} />
        </div>
      </div>
    </div>
  );
};

export default DeleteButton;
