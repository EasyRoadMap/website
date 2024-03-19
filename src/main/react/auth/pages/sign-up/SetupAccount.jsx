import styles from "../../style.module.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useEmail } from "../../hooks/useEmail.js";

import Base from "../Base.jsx";
import Input from "../../components/Input.jsx";
import { errorsHandler, errorApplier } from "../../utils/errorsHandler.js";
import { signUpEmailCode } from "../../api/SignUpEmailCode.js";

const validatePassword = (password, setErrorPassword) => {
  if (password.length >= 8 && password.length <= 128) return true;
  setErrorPassword("Пароль должен быть не менее 8 и не более 128 символов");
  return false;
}

const validateName = (name, setErrorName) => {
  if (name.length >= 1 && name.length <= 64) return true;
  setErrorName("Имя должно быть не менее 1 и не более 64 символов");
  return false;
}

const tryGetCode = (email, name, password, showPopup, setters, navigateLinks, setPending, navigate) => {
  setPending(true);

  signUpEmailCode(email, name)
    .then((response) => {
      navigate("/auth/sign-up/email-code", {
        state: { password: password, name: name },
      });
    })
    .catch((err) => {
      const errData = err.response.data;
      errorsHandler(errData, showPopup, setters, navigateLinks);
    }).finally(() => {
      setPending(false);
    })
}

const setErrorsFromOtherPages = (location, errorSetters) => {
  return errorApplier(location.state?.error, errorSetters);
}

const Form = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const {email, setEmail, saveEmail} = useEmail();
    const [errorName, setErrorName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [pending, setPending] = useState(false);
    const [policyBoxChecked, setPolicyBoxChecked] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    setErrorsFromOtherPages(location, {"email": setErrorEmail, "password": setErrorPassword, "name": setErrorName});

    const showPopup = (error) => {
        alert(error);
    }

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

        const setters = {"email": setErrorEmail, "password": setErrorPassword, "name": setErrorName};
        const navigateLinks = {"email": "/auth/sign-in"}
        tryGetCode(email, name, password, showPopup, setters, navigateLinks, setPending, navigate);
    };

    return (
        <>
          <form id="sign-up" onSubmit={handleSubmit}>
            <Input 
              data={name} 
              setData={setName} 
              placeholder="Ваше имя" 
              error={errorName}
              clearError={() => {setErrorName("");}}
            />
            <Input
              data={email}
              setData={setEmail}
              placeholder="Электронная почта"
              error={errorEmail}
              clearError={() => {setErrorEmail("");}}
            />
            <Input
              data={password}
              setData={setPassword}
              placeholder="Пароль"
              error={errorPassword}
              clearError={() => {setErrorPassword("");}}
            />
          </form>
            <input
              type="checkbox"
              name="policyAcception"
              className="mr-2 ml-2"
              checked={setPolicyBoxChecked}
              onChange={() => setPolicyBoxChecked(!policyBoxChecked)}
            ></input>
            <h2 className={styles.discription}>
              Я прочитал(а) условия <br />
              <strong className="text-black">
                <a className={styles.repeatLink} href="">
                  пользовательского соглашения
                </a>
                и 
                <a className={styles.repeatLink} href="">
                  политики конфиденциальности
                </a>
              </strong>
            </h2>
          <button
            className={styles.button}
            form="sign-up"
            type="submit"
            disabled={pending || (!policyBoxChecked)}
          >
            Продолжить
          </button>
        </>
    );
}


function CreateAccount() {
  return (
    <Base header="Войдите в аккаунт" children={<Form />}/>
  );
}

export default CreateAccount;
