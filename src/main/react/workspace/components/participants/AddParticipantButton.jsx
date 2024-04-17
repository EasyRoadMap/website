import styles from "./styles.module.css";
import AddPersonSVG from "../../../assets/addPerson.jsx";

const AddParticipantButton = () => {
  return (
    <button className={styles.addButton}>
      {/* add icon */}
      <div className={styles.addLogo}>
        <AddPersonSVG />
      </div>
      <div className={styles.addUser}>Добавить участника</div>
    </button>
  );
};

export default AddParticipantButton;
