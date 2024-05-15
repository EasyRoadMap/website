import styles from "./InputCheckBoxAddUser.module.css";
const InputCheckBoxAddUser = ({ id }) => {
  return (
    <div className={styles.checkboxWrapperPrivatePolicy}>
      <input id={id} type="checkbox" className={styles.checkbox}></input>
      <label for={id} className={styles.label}></label>
    </div>
  );
};
export default InputCheckBoxAddUser;
