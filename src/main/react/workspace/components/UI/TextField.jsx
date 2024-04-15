import styles from "./styleUI.module.css";

const TextField = ({ data, setData, title, placeholder, type }) => {
  const inputField = type === "textarea" ?
    <textarea className={[styles.input, styles.textarea].join(" ")} type="text" placeholder={placeholder} /> :
    <input className={styles.input} type="text" placeholder={placeholder} />

  return (
    <form className={styles.form}>
      <label className={styles.titleInput}> {title} </label>
      {inputField}
    </form>
  );
};

export default TextField;
