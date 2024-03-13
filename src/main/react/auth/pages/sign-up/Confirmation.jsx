import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import styles from "../../style.module.css";
import Logo from "../../components/Logo.jsx";

import { signUpConfirmEmail } from "../../api/SignUpConfirmEmail.js";
import { signUp } from "../../api/SignUp.js";

import Input from "../../components/Input.jsx";

function Confirmation() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state.email;
  const name = location.state.name;
  const password = location.state.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Confirmation: " + email);
    signUpConfirmEmail(email, code)
      .then((response) => {
        console.log(response);
        signUpRequest();
      })
      .catch((err) => {
        alert("error happened in confirmation");
      });
  };

  const signUpRequest = () => {
    signUp(email, password, name)
      .then((response) => {
        console.log(response);
        navigate("/auth/sign-up/complete");
      })
      .catch((err) => {
        alert("error happened in sign up");
      });
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.mainPage}>
          <Logo></Logo>
          <h1 className={styles.title1}>Подтверждение почты</h1>
          <h2 className={styles.discription}>
            Код подтверждения был отправлен на <br />
            <strong className="text-black">
              <a href="mailto:llnnnlly@gmail.com">user.email@domain.ru</a>
            </strong>
            , введите его здесь:
          </h2>
          <form id="confirmation" onSubmit={handleSubmit}>
            <Input data={code} setData={setCode} placeholder={"Введите код"} />
            {/* <input className={styles.verification} maxLength="1"></input>
         <input className={styles.verification} maxLength="1"></input>
         <input className={styles.verification} maxLength="1"></input>
         <input className={styles.verification} maxLength="1"></input>
         <input className={styles.verification} maxLength="1"></input>
         <input className={styles.verification} maxLength="1"></input> */}
          </form>
          <button className={styles.button} form="confirmation" type="submit">
            Войти
          </button>
          <h2 className={styles.discription}>
            Не получили письмо с кодом? <br />
            <strong className="text-black">
              <a className={styles.repeatLink} href="mailto:llnnnlly@gmail.com">
                Повторить отправку
              </a>
            </strong>
            &nbsp;(10 сек)
          </h2>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
