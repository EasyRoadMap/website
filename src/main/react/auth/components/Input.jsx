import styles from "./input.module.css";
import eyeSVG from "../../assets/eye.jsx";
import eyeOffSVG from "../../assets/eyeOff.jsx";
import { useState } from "react";

const autoCompleteName = {
  name: "name",
  email: "email",
  password: "current-password",
};

export default function Input({
  data,
  setData,
  placeholder,
  error,
  clearError,
  typeOfInput,
}) {
  const inputStyle = error ? styles.error : "";

  const changeValue = (e) => {
    setData(e.target.value);
    if (clearError) clearError();
  };

  const [password, setPassword] = useState("");
  const [type, setType] = useState(typeOfInput);
  const [icon, setIcon] = useState(eyeOffSVG);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eyeSVG);
      setType("text");
    } else {
      setIcon(eyeOffSVG);
      setType("password");
    }
  };

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={[styles.input, inputStyle].join(" ")}
          placeholder={placeholder}
          onChange={changeValue}
          value={data}
          autoComplete={autoCompleteName[typeOfInput]}
        ></input>
        <div>
          {typeOfInput === "password" && (
            <div onClick={handleToggle} className={styles.iconSVG}>
              {icon}
            </div>
          )}
        </div>
      </div>

      <h3 className={styles.errorText}>{error}</h3>
    </>
  );
}
