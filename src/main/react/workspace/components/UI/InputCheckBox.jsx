import styles from "./InputCheckBox.module.css";
const typeInputDescription = {
  deleteAccount: {
    text: "аккаунта",
  },
  deleteProject: {
    text: "проекта",
  },
  deleteWorkspace: {
    text: "рабочей области",
  },
};
const InputCheckBox = ({ typeDescription }) => {
  const dataDescription = typeInputDescription[typeDescription];
  return (
    <div className={styles.checkboxWrapperPrivatePolicy}>
      <input id="check" type="checkbox" className={styles.checkbox}></input>
      <label for="check" className={styles.label}>
        Я понимаю, что все данные {dataDescription.text} будут <br /> удалены и
        не могут быть восстановлены.
      </label>
    </div>
  );
};
export default InputCheckBox;
