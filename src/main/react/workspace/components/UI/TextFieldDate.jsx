import styles from "./styleUI.module.css";
import CalendarSVG from "../../../assets/calendarSVG.jsx";

export default function TextFieldDate({
  data,
  setData
}) {
  const changeValue = (e) => {
    setData(e.target.value);
    if (clearError) clearError();
  };

  return (
    <div className={styles.textFielddate}>
      <CalendarSVG className={styles.calendarSVG} />
      <input
        type="date"
        className={styles.inputDate}
        placeholder="Введите дату дедлайна задачи"
        onChange={changeValue}
        value={data}
      />
    </div>
  );
}
