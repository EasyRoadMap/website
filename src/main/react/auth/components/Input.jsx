import styles from "../style.module.css";

export default function Input(
  {
    data,
    setData,
    placeholder
  }
) {
  const changeValue = (e) => {
    setData(e.target.value);
  }

  return (
    <input
        className={styles.input}
        placeholder={placeholder}
        onChange={changeValue}
        value={data}
    ></input>
  );
}
