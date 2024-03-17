import styles from "../style.module.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useEmail } from "../hooks/useEmail.js";

import Base from "./Base.jsx";
import VerificationCodeInput from "../components/verificationNav.jsx";

const validateCode = (code, setCodeError) => {
    if (getCode(code).length === 6) return true;
    setCodeError("Код должен состоять из 6 символов");
    return false;
}

const getCode = (code) => {
    return code.join("");
} 

const Form = ({
    APICallback,
    linksToPagesThatCanIncludeErrors
}) => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [errorCode, setErrorCode] = useState("");
    const [pending, setPending] = useState(false);

    const {email} = useEmail();

    const navigate = useNavigate();
    const location = useLocation();
    const password = location.state?.password;
    const name = location.state?.name;

    const showPopup = (error) => {
        alert(error);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateCode(code, setErrorCode)) return;
        const setters = {"code": setErrorCode};
        const navigateLinks = linksToPagesThatCanIncludeErrors

        if ((!password) || (!name))
            APICallback(email, getCode(code), showPopup, setters, navigateLinks, navigate, setPending);
        else
            APICallback(email, getCode(code), password, name, showPopup, setters, navigateLinks, navigate, setPending);
    };

    return (
        <>
        <h2 className={styles.discription}>
            Код восстановления был отправлен на <br />
            <strong className="text-black">
                {email}
            </strong>
            , введите его здесь:
        </h2>
        <form id="confirm" onSubmit={handleSubmit}>
            <VerificationCodeInput 
                code={code}
                setCode={setCode}
                error={errorCode}
                clearError={() => {setErrorCode("");}}
            />
        </form>
        <button
            className={styles.button}
            form="confirm"
            type="submit"
            disabled={pending}
        >
        Войти
        </button>
        <h2 className={styles.discription}>
            Не получили письмо с кодом? <br />
            <strong className="text-black" onClick={pending ? () => {} : handleSubmit}>
                Повторить отправку
            </strong>
            &nbsp;(10 сек)
        </h2>
        </>
    );
}


function ConfirmationCode({
    header,
    APICallback,
    linksToPagesThatCanIncludeErrors
}) {
  return (
    <Base header={header} children={<Form 
        APICallback={APICallback}
        linksToPagesThatCanIncludeErrors={linksToPagesThatCanIncludeErrors}
        location={location}
    />}/>
  );
}

export default ConfirmationCode;
