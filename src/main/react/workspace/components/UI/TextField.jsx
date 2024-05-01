import styles from "./styleUI.module.css";

const TextField = ({ data, setData, title, placeholder, type, loading = null }) => {
  console.log("INPUT");
  console.log(data);

  const changeValue = (e) => {
    setData(e.target.value);
  };

  const inputField = type === "textarea" ?
    <textarea className={[styles.input, styles.textarea].join(" ")} type="text" placeholder={placeholder} disabled={loading}/> :
    <input className={styles.input} type="text" placeholder={placeholder} onChange={changeValue} value={data} disabled={loading}/>

  if (loading === null || loading === false) {
    return (
      <form className={styles.form}>
        <label className={styles.titleInput}> {title} </label>
        {inputField}
      </form>
    );
  }
};

export default TextField;
