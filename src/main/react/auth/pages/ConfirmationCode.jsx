import styles from "../style.module.css";
import styleBtn from "../pages/button.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useEmail } from "../hooks/useEmail.js";

import Base from "./Base.jsx";
import VerificationCodeInput from "../components/verificationNav.jsx";
import ErrorPopup from "../components/ErrorPopup.jsx";

const validateCode = (code, setCodeError) => {
  if (getCode(code).length === 6) return true;
  setCodeError("Код должен состоять из 6 символов");
  return false;
};

const getCode = (code) => {
  return code.join("");
};

const preventUnacceptableEnter = (location, navigate) => {
  if (!location.state?.haveAccess) {
    navigate("/auth/sign-in");
  }
};

const Form = ({ APICallback, linksToPagesThatCanIncludeErrors }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorCode, setErrorCode] = useState("");
  const [pending, setPending] = useState(false);
  const [popupError, setPopupError] = useState("");

  const { email } = useEmail();

  const navigate = useNavigate();
  const location = useLocation();
  const password = location.state?.password;
  const name = location.state?.name;

  useEffect(() => {
    preventUnacceptableEnter(location, navigate);
  }, []);

  const showPopup = (error) => {
    setPopupError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCode(code, setErrorCode)) return;
    const setters = { code: setErrorCode };
    const navigateLinks = linksToPagesThatCanIncludeErrors;

    if (!password || !name)
      APICallback(
        email,
        getCode(code),
        showPopup,
        setters,
        navigateLinks,
        navigate,
        setPending
      );
    else
      APICallback(
        email,
        getCode(code),
        password,
        name,
        showPopup,
        setters,
        navigateLinks,
        navigate,
        setPending
      );
  };

  return (
    <>
      <h2 className={styles.discription}>
        Письмо с кодом восстановления было отправлено на почту&nbsp;
        <strong className="text-black">{email}</strong>.
        <br />
        Проверьте почту и введите код ниже.
      </h2>
      <form id="confirm" onSubmit={handleSubmit}>
        <VerificationCodeInput
          code={code}
          setCode={setCode}
          error={errorCode}
          clearError={() => {
            setErrorCode("");
            setPopupError("");
          }}
        />
      </form>
      <ErrorPopup isShown={popupError !== ""} errorText={popupError} />
      <button
        className={styleBtn.buttonFilledAccent}
        form="confirm"
        type="submit"
        disabled={pending}
      >
        Продолжить
      </button>
      <h2 className={styles.descriptionBottom}>
        Не пришло письмо с кодом восстановления?
        <br />
        <strong
          className={styles.repeatLinkPrivacyPolicy}
          onClick={pending ? () => {} : handleSubmit}
        >
          Повторить отправку
        </strong>
        &nbsp;(5 мин)
      </h2>
    </>
  );
};

function ConfirmationCode({
  header,
  APICallback,
  linksToPagesThatCanIncludeErrors,
}) {
  return (
    <Base
      header={header}
      children={
        <Form
          APICallback={APICallback}
          linksToPagesThatCanIncludeErrors={linksToPagesThatCanIncludeErrors}
          location={location}
        />
      }
    />
  );
}

export default ConfirmationCode;
