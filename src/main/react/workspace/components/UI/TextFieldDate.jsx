import styles from "./styleUI.module.css";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import { useState } from "react";
import ErrorTooltip from "./ErrorTooltip.jsx";

export default function TextFieldDate({
  data,
  setData,
  error,
  clearError
}) {
  const inputStyle = error ? styles.error : "";
  const [active, setActive] = useState(false);

  const changeValue = (e) => {
    setData(e.target.value);
    if (clearError) clearError();
  };

  return (
    <div style={{position: "relative"}}>
      <div className={styles.textFielddate}>
        <CalendarSVG className={styles.calendarSVG} />
        <input
          type="date"
          className={[styles.inputDate, inputStyle].join(" ")}
          placeholder="Введите дату дедлайна задачи"
          onChange={changeValue}
          value={data}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        />
      </div>
      <ErrorTooltip isShown={active && error} errorText={error} stylesFromOutside={{bottom: "-59px"}}/>
    </div>
  );
}
