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

const InputDate = ({ data, setData, typeDate, loading }) => {
  const date = TypeDateInput[typeDate];

  const changeValue = (e) => {
    console.debug("Date,", e.target.value);
    setData(e.target.value);
  };

  return (
    <>
      <div className={styles.inputWithTextWrapper}>
        <label className={styles.label}>{date.lable}</label>
        <div className={styles.inputWrapper}>
          <CalendarSVG className={styles.calendarSVG} />
          <input
            type="date"
            className={styles.input}
            placeholder={date.placeholder}
            min={"1990-01-01"}
            max={"2990-01-01"}
            onChange={changeValue}
            value={data}
          ></input>
        </div>
      </div>
    </>
  );
};
export default InputDate;
