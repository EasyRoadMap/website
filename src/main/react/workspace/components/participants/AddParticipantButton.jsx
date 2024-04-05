import styles from "./styles.module.css";

const AddParticipantButton = () => {
  return (
    <div className={styles.addButton}>
      {/* add icon */}
      <img src="" alt="" className={styles.addLogo} />
      <div className={styles.addUser}>Добавить участника</div>
    </div>
  );
};

export default AddParticipantButton;
