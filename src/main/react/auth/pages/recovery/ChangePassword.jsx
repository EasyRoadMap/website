import styles from "../../style.module.css";
import styleBtn from "../../pages/button.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useEmail } from "../../hooks/useEmail.js";

import Base from "../Base.jsx";
import Input from "../../components/Input.jsx";
import ErrorPopup from "../../components/ErrorPopup.jsx";
import { errorsHandler } from "../../utils/errorsHandler.js";
import { RecoverySetPassword } from "../../api/RecoverySetPassword.js";

const preventUnacceptableEnter = (location, navigate) => {
  if (!location.state?.haveAccess) {
    navigate("/auth/sign-in");
  }
};

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
      navigate("/auth/recovery/complete", {
        state: { password: password, haveAccess: true },
      });
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
  const [popupError, setPopupError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    preventUnacceptableEnter(location, navigate);
  }, []);

  const showPopup = (error) => {
    setPopupError(error);
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
          placeholder="••••••••"
          error={errorPassword}
          clearError={() => {
            setErrorPassword("");
            setPopupError("");
          }}
          typeOfInput={"password"}
        />
        <Input
          data={repeatedPassword}
          setData={setRepeatedPassword}
          placeholder="••••••••"
          error={errorRepeatedPassword}
          clearError={() => {
            setErrorRepeatedPassword("");
            setPopupError("");
          }}
          typeOfInput={"repeatPassword"}
        />
      </form>
      <ErrorPopup isShown={popupError !== ""} errorText={popupError} />
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
