import styles from "../UI/styleUI.module.css";
export default function Switch({ checked, onChange }) {
  return (
    <>
      <label className={styles.toggle}>
        <input
          className={styles.toggleCheckbox}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />

        <div className={styles.toggleSwitch}></div>
      </label>
    </>
  );
}
