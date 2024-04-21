import styles from "./styleUI.module.css";

export default function TextFieldDate() {
  return (
    <div className={styles.textFieldLink}>
      <div className={styles.textFieldLinkTitleForm}>
        <input className={styles.inputLinkTitle} placeholder="Название" />
      </div>
      <div className={styles.textFieldLinkForm}>
        <input className={styles.inputLink} placeholder="https://" />
      </div>
    </div>
  );
}
