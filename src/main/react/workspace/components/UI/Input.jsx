import styles from "./input.module.css";
import eyeSVG from "../../../assets/eye.jsx";
import eyeOffSVG from "../../../assets/eyeOff.jsx";
import ErrorTooltip from "./ErrorTooltip.jsx";
import { useState } from "react";

const autoCompleteName = {
  name: "name",
  email: "email",
  nameRegion: "off",
  descriptionRegion: "off",
  nameTask: "off",
  descriptionTask: "off",
  nameProject: "off",
  descriptionProject: "off",
  nameStage: "off",
  password: "current-password",
  newPassword: "password",
  repeatedPassword: "off",
  position: "off",
  date: "off",
};

const translation = {
  name: "Имя",
  email: "Электронная почта",
  nameRegion: "Название области",
  descriptionRegion: "Описание области",
  nameTask: "Название задачи",
  descriptionTask: "Описание задачи",
  nameProject: "Название проекта",
  descriptionProject: "Описание проекта",
  nameStage: "Название этапа",
  password: "Текущий пароль",
  newPassword: "Новый пароль",
  repeatedPassword: "Повторите пароль",
  position: "Должность",
  date: "Дата окончания",
};

export default function Input({
  data,
  setData,
  placeholder,
  error,
  clearError,
  typeOfInput,
  loading = null,
}) {
  const inputStyle = error ? styles.error : "";
  const inputWithContentStyle = data ? styles.inputWithContent : "";

  const changeValue = (e) => {
    setData(e.target.value);
    if (clearError) clearError();
  };

  const [type, setType] = useState(typeOfInput);
  const [icon, setIcon] = useState(eyeOffSVG);
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eyeSVG);
      setType("text");
    } else {
      setIcon(eyeOffSVG);
      setType("password");
    }
  };
  if (loading === null || loading === false) {
    return (
      <>
        <div className={styles.inputWithTextWrapper}>
          <label className={styles.label}>{translation[typeOfInput]}</label>
          <div className={styles.inputWrapper}>
            <input
              type={(type === "repeatedPassword" || type === "newPassword") ? "password" : type}
              className={[styles.input, inputWithContentStyle, inputStyle].join(
                " "
              )}
              placeholder={placeholder}
              onChange={changeValue}
              value={data}
              autoComplete={autoCompleteName[typeOfInput]}
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
              min={type === "date" ? "1990-01-01" : undefined}
              max={type === "date" ? "2990-01-01" : undefined}
            ></input>
            {(typeOfInput === "password" || typeOfInput === "newPassword") && (
              <div onClick={handleToggle} className={styles.iconSVG}>
                {icon}
              </div>
            )}
          </div>
          <ErrorTooltip isShown={active && error} errorText={error} stylesFromOutside={{bottom: "-59px"}}/>
        </div>
      </>
    );
  }
}
