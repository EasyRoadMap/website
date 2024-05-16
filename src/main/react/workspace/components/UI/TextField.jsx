import styles from "./styleUI.module.css";
import ErrorTooltip from "./ErrorTooltip.jsx";
import { useState } from "react";

const TextField = ({ data, setData, title, placeholder, type, loading = null, error, clearError }) => {
  const inputStyle = error ? styles.error : "";

  const [active, setActive] = useState(false);


  const changeValue = (e) => {
    setData(e.target.value);
    if (clearError) clearError();
  };

  const inputField = type === "textarea" ?
    <textarea 
      className={[styles.input, styles.textarea, inputStyle].join(" ")} 
      type="text" 
      placeholder={placeholder} 
      onChange={changeValue} 
      value={data} 
      disabled={loading}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    /> :
    <input 
      className={[styles.input, inputStyle].join(" ")} 
      type="text" 
      placeholder={placeholder} 
      onChange={changeValue} 
      value={data} 
      disabled={loading}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    />

  if (loading === null || loading === false) {
    return (
      <div style={{position: "relative"}}>
        <form className={styles.form}>
          <label className={styles.titleInput}> {title} </label>
          {inputField}
        </form>
        <ErrorTooltip isShown={active && error} errorText={error} stylesFromOutside={{bottom: "-59px"}}/>
      </div>
    );
  }
};

export default TextField;
