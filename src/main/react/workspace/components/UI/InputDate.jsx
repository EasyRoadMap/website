import styles from "./inputDate.module.css";
import CalendarSVG from "../../../assets/calendarSVG.jsx";
import { useState } from "react";
import ErrorTooltip from "./ErrorTooltip.jsx";

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

const InputDate = ({ data, setData, typeDate, loading, error, clearError }) => {
  const date = TypeDateInput[typeDate];
  const inputStyle = error ? styles.error : "";
  const [active, setActive] = useState(false);

  const changeValue = (e) => {
    setData(e.target.value);
    if (clearError) clearError();
  };

  return (
    <>
      <div className={styles.inputWithTextWrapper}>
        <label className={styles.label}>{date.lable}</label>
        <div className={styles.inputWrapper}>
          <CalendarSVG className={styles.calendarSVG} />
          <input
            type="date"
            className={[styles.input, inputStyle].join(" ")}
            placeholder={date.placeholder}
            min={"1990-01-01"}
            max={"2990-01-01"}
            onChange={changeValue}
            value={data}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          ></input>
        </div>
        <ErrorTooltip isShown={active && error} errorText={error} stylesFromOutside={{bottom: "-59px"}}/>
      </div>
    </>
  );
};
export default InputDate;
