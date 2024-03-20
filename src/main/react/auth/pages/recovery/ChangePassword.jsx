import styles from "../../style.module.css";
import styleBtn from "../../pages/button.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEmail } from "../../hooks/useEmail.js";

import Base from "../Base.jsx";
import Input from "../../components/Input.jsx";
import { errorsHandler } from "../../utils/errorsHandler.js";
import { RecoverySetPassword } from "../../api/RecoverySetPassword.js";

const validatePassword = (password, setErrorPassword) => {
  if (password.length >= 8 && password.length <= 128) return true;
  setErrorPassword("Пароль должен быть не менее 8 и не более 128 символов");
  return false;
};

const validateRepeatedPassword = (
  password,
  repeatedPassword,
  setErrorRepeatedPassword
) => {
  if (repeatedPassword === password) return true;
  setErrorRepeatedPassword("Пароли не совпадают");
  return false;
};

const trySetPassword = (
  email,
  password,
  showPopup,
  setters,
  navigateLinks,
  setPending,
  navigate
) => {
  setPending(true);
  RecoverySetPassword(email, password)
    .then((response) => {
      navigate("/auth/recovery/complete", { state: { password: password } });
    })
    .catch((err) => {
      const errData = err.response.data;
      errorsHandler(errData, showPopup, setters, navigateLinks);
    })
    .finally(() => {
      setPending(false);
    });
};

const Form = () => {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRepeatedPassword, setErrorRepeatedPassword] = useState("");
  const [pending, setPending] = useState(false);
  const { email } = useEmail();

  const navigate = useNavigate();

  const showPopup = (error) => {
    alert(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password, setErrorPassword)) return;
    if (
      !validateRepeatedPassword(
        password,
        repeatedPassword,
        setErrorRepeatedPassword
      )
    )
      return;

    const setters = { password: setErrorPassword };
    const navigateLinks = { email: "/auth/sign-in" };
    trySetPassword(
      email,
      password,
      showPopup,
      setters,
      navigateLinks,
      setPending,
      navigate
    );
  };

  return (
    <>
      <form id="recovery" onSubmit={handleSubmit}>
        <Input
          data={password}
          setData={setPassword}
          placeholder="Пароль"
          error={errorPassword}
          clearError={() => {
            setErrorPassword("");
          }}
          typeOfInput={"password"}
        />
        <Input
          data={repeatedPassword}
          setData={setRepeatedPassword}
          placeholder="Повтор пароля"
          error={errorRepeatedPassword}
          clearError={() => {
            setErrorRepeatedPassword("");
          }}
          typeOfInput={"password"}
        />
      </form>
      <button
        type="submit"
        form="recovery"
        className={styleBtn.buttonFilledAccent}
        disabled={pending}
      >
        Изменить пароль
      </button>
    </>
  );
};

function Recovery() {
  return <Base header="Придумайте пароль" children={<Form />} />;
}

export default Recovery;
