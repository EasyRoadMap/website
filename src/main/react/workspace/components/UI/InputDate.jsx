import styles from "./inputDate.module.css";
import CalendarSVG from "../../../assets/calendarSVG.jsx";

export default function InputDate() {
  return (
    <>
      <div className={styles.inputWithTextWrapper}>
        <label className={styles.label}>Дата дедлайна</label>
        <div className={styles.inputWrapper}>
          <CalendarSVG className={styles.calendarSVG} />
          <input
            className={styles.input}
            placeholder="Введите дату дедлайна задачи"
          ></input>
        </div>
      </div>
    </>
  );
}
