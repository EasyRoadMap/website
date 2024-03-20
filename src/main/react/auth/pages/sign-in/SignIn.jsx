import styles from "../../style.module.css";
import styleBtn from "../../pages/button.module.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signIn } from "../../api/SignIn.js";

import { useEmail } from "../../hooks/useEmail.js";

import Base from "../Base.jsx";
import Input from "../../components/Input.jsx";
import { errorsHandler, errorApplier } from "../../utils/errorsHandler.js";
import { RecoveryEmailCode } from "../../api/RecoveryEmailCode.js";
import ForgotPasswordButton from "../../components/ForgotPasswordButton.jsx";

const validatePassword = (password, setErrorPassword) => {
  if (password.length >= 8 && password.length <= 128) return true;
  setErrorPassword("Пароль должен быть не менее 8 и не более 128 символов");
  return false;
};

const trySignIn = (email, password, check, showPopup, setters, setPending) => {
  setPending(true);
  signIn(email, password, check)
    .then((response) => {
      document.location.replace(response.request.responseURL);
    })
    .catch((err) => {
      const errData = err.response.data;
      errorsHandler(errData, showPopup, setters);
    })
    .finally(() => {
      setPending(false);
    });
};

const tryGetRecovery = (email, showPopup, setters, navigate, setPending) => {
  setPending(true);
  RecoveryEmailCode(email)
    .then((response) => {
      navigate("/auth/recovery/email-code");
    })
    .catch((err) => {
      const errData = err.response.data;
      errorsHandler(errData, showPopup, setters);
    })
    .finally(() => {
      setPending(false);
    });
};

const validateEmail = (email, saveEmail, setErrorEmail) => {
  try {
    saveEmail(email);
    return true;
  } catch (err) {
    setErrorEmail(err.message);
    return false;
  }
};

const setErrorsFromOtherPages = (location, errorSetters) => {
  return errorApplier(location.state?.error, errorSetters);
};

const Form = () => {
  const { email, setEmail, saveEmail } = useEmail();
  const [check, setCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  setErrorsFromOtherPages(location, {
    email: setErrorEmail,
    password: setErrorPassword,
  });

  const showPopup = (error) => {
    alert(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email, saveEmail, setErrorEmail)) return;
    if (!validatePassword(password, setErrorPassword)) return;

    const setters = { email: setErrorEmail, password: setErrorPassword };
    trySignIn(email, password, check, showPopup, setters, setPending);
  };

  return (
    <>
      <form id="login" onSubmit={handleSubmit}>
        <Input
          data={email}
          setData={setEmail}
          placeholder="user@example.com"
          error={errorEmail}
          clearError={() => {
            setErrorEmail("");
          }}
          typeOfInput="email"
        />
        <Input
          data={password}
          setData={setPassword}
          placeholder="••••••••"
          error={errorPassword}
          clearError={() => {
            setErrorPassword("");
          }}
          typeOfInput="password"
        />
        <ForgotPasswordButton
          text="Забыли пароль?"
          callback={() => {
            if (validateEmail(email, saveEmail, setErrorEmail))
              tryGetRecovery(
                email,
                showPopup,
                { email: setErrorEmail, password: setErrorPassword },
                navigate,
                setPending
              );
          }}
          active={!pending}
        />
        <input
          id="check"
          type="checkbox"
          className={styles.checkbox}
          disabled={pending}
        ></input>
        <label
          for="check"
          onChange={() => {
            setCheck(!check);
          }}
        >
          Запомни меня!
        </label>
      </form>
      <button
        type="submit"
        form="login"
        className={styleBtn.buttonFilledAccent}
        disabled={pending}
      >
        Войти
      </button>
      <button
        className={styleBtn.buttonOutlineAccent}
        onClick={() => {
          navigate("/auth/sign-up");
        }}
        disabled={pending}
      >
        Создать аккаунт
      </button>
    </>
  );
};

function SignIn() {
  return <Base header="Войдите в аккаунт" children={<Form />} />;
}

export default SignIn;
