import styles from "./input.module.css";

export default function Input({
    data,
    setData,
    placeholder,
    error,
    clearError
  }) {
  const inputStyle = error ? styles.error : "";

  const changeValue = (e) => {
    setData(e.target.value);
    if (clearError) clearError();
  }

  return (
    <>
      <input
          className={[styles.input, inputStyle].join(' ')}
          placeholder={placeholder}
          onChange={changeValue}
          value={data}
      ></input>
      <h3 className={styles.errorText}>{error}</h3>
    </>
  );
}
