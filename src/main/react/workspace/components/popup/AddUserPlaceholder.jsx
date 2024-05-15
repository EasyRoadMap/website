import styles from "./AddUserPopup.module.css";
import AddUserSVG from "../../../assets/addUserSVG.jsx";
const AddUserPlaceholder = () => {
  return (
    <>
      <div className={styles.AddUserPlaceholderContainer}>
        <h1 className={styles.title}>Добавить участника </h1>
        <div className={styles.AddUserPlaceholderWrapper}>
          <AddUserSVG className={styles.AddUserSVG} />
          <div className={styles.AddUserPlaceholderText}>
            <span className={styles.AddUserPlaceholderTitle}>
              Нет пользователей для добавления в этот проект.
            </span>
            <span className={styles.AddUserPlaceholderDescription}>
              Все участники рабочей области уже добавлены в проект.
              <br /> Вы можете пригласить новых пользователей в рабочую
              <br /> область, чтобы затем добавить их сюда.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddUserPlaceholder;
