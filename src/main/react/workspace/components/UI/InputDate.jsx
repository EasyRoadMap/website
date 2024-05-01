import styles from "./inputDate.module.css";
import CalendarSVG from "../../../assets/calendarSVG.jsx";

const TypeDateInput = {
  endDate: {
    lable: "Дата окончания",
    placeholder: "Введите дату окончания проекта",
  },
  deadlineDate: {
    lable: "Дата дедлайна",
    placeholder: "Введите дату дедлайна задачи",
  },
};

const InputDate = ({ typeDate, loading }) => {
  const data = TypeDateInput[typeDate];

  if (loading === null || loading === true) {
    return (
      <>
        <div className={styles.inputWithTextWrapper}>
          <label className={styles.label}>{data.lable}</label>
          <div className={styles.inputWrapper}>
            <CalendarSVG className={styles.calendarSVG} />
            <input
              type="date"
              className={styles.input}
              placeholder={data.placeholder}
              min={"1990-01-01"}
              max={"2990-01-01"}
            ></input>
          </div>
        </div>
      </>
    );
  }
};
export default InputDate;
