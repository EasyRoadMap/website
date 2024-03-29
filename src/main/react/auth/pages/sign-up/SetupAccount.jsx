import styles from "../../style.module.css";
import styleBtn from "../../pages/button.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useEmail } from "../../hooks/useEmail.js";

import Base from "../Base.jsx";
import Input from "../../components/Input.jsx";
import ErrorPopup from "../../components/ErrorPopup.jsx";
import { errorsHandler, errorApplier } from "../../utils/errorsHandler.js";
import { signUpEmailCode } from "../../api/SignUpEmailCode.js";

const validatePassword = (password, setErrorPassword) => {
  if (password.length >= 8 && password.length <= 128) return true;
  setErrorPassword("Пароль должен быть не менее 8 и не более 128 символов");
  return false;
};

const validateName = (name, setErrorName) => {
  if (name.length >= 1 && name.length <= 64) return true;
  setErrorName("Имя должно быть не менее 1 и не более 64 символов");
  return false;
};

const tryGetCode = (
  email,
  name,
  password,
  showPopup,
  setters,
  navigateLinks,
  setPending,
  navigate
) => {
  setPending(true);

  signUpEmailCode(email, name)
    .then((response) => {
      navigate("/auth/sign-up/email-code", {
        state: { password: password, name: name, haveAccess: true },
      });
    })
    .catch((err) => {
      const errData = err.response.data;
      errorsHandler(errData, showPopup, setters, navigateLinks, navigate);
    })
    .finally(() => {
      setPending(false);
    });
};

const setErrorsFromOtherPages = (location, errorSetters) => {
  return errorApplier(location.state?.error, errorSetters);
};

const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { email, setEmail, saveEmail } = useEmail();
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [policyBoxChecked, setPolicyBoxChecked] = useState(false);
  const [popupError, setPopupError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setErrorsFromOtherPages(location, {
      email: setErrorEmail,
      password: setErrorPassword,
      name: setErrorName,
    });
  }, []);

  const showPopup = (error) => {
    setPopupError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      saveEmail(email);
    } catch (err) {
      setErrorEmail(err.message);
      return;
    }

    if (!validatePassword(password, setErrorPassword)) return;
    if (!validateName(name, setErrorName)) return;

    const setters = {
      email: setErrorEmail,
      password: setErrorPassword,
      name: setErrorName,
    };
    const navigateLinks = { email: "/auth/sign-in" };
    tryGetCode(
      email,
      name,
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
      <form id="sign-up" onSubmit={handleSubmit} className={styles.form}>
        <Input
          data={name}
          setData={setName}
          placeholder="Введите его здесь"
          error={errorName}
          clearError={() => {
            setErrorName("");
            setPopupError("");
          }}
          typeOfInput="name"
        />
        <Input
          data={email}
          setData={setEmail}
          placeholder="user@example.com"
          error={errorEmail}
          clearError={() => {
            setErrorEmail("");
            setPopupError("");
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
            setPopupError("");
          }}
          typeOfInput="password"
        />
      </form>
      <div className={styles.checkboxWrapperPrivatePolicy}>
        <input
          id="check"
          type="checkbox"
          className={styles.checkbox}
          disabled={pending}
          onChange={() => setPolicyBoxChecked(!policyBoxChecked)}
        ></input>
        <label
          for="check"
          onChange={() => {
            setCheck(!check);
          }}
        >
          <h2 className={styles.discriptionPrivacyPolicy}>
            Я прочитал(а) условия{" "}
            <strong className="text-black">
              <a className={styles.repeatLinkPrivacyPolicy} href="">
                пользовательского <br /> соглашения{" "}
              </a>
              и{" "}
              <a className={styles.repeatLinkPrivacyPolicy} href="">
                политики конфиденциальности
              </a>
            </strong>
          </h2>
        </label>
      </div>
      <ErrorPopup isShown={popupError !== ""} errorText={popupError} />
      <button
        className={[styleBtn.btn, styleBtn.buttonFilledAccent].join(" ")}
        form="sign-up"
        type="submit"
        disabled={pending || !policyBoxChecked}
      >
        Продолжить
      </button>
    </>
  );
};

function CreateAccount() {
  return <Base header="Создайте аккаунт" children={<Form />} />;
}

export default CreateAccount;
