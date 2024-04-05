import styles from "./styleUI.module.css";

const TextField = ({ data, setData, title, placeholder }) => {
  return (
    <form>
      <label className={styles.titleInput}> {title} </label>
      <input className={styles.input} type="text" placeholder={placeholder} />
    </form>
  );
};

export default TextField;
