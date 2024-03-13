import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "../../style.module.css";
import Logo from "../../components/Logo.jsx";
import Input from "../../components/Input.jsx";

import { RecoveryConfirmEmail } from "../../api/RecoveryConfirmEmail.js";

function RecoveryCode() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rec Confirmation: " + email);
    RecoveryConfirmEmail(email, code)
      .then((response) => {
        console.log(response);
        navigate("/auth/recovery/set-password", { state: { email: email } });
      })
      .catch((err) => {
        alert("error happened in recovery confirmation");
      });
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.mainPage}>
          <Logo></Logo>
          <h1 className={styles.title1}>Восстановление доступа</h1>
          <h2 className={styles.discription}>
            Код восстановления был отправлен на <br />
            <strong className="text-black">
              <a href="mailto:llnnnlly@gmail.com">user.email@domain.ru</a>
            </strong>
            , введите его здесь:
          </h2>
          <form id="recovery-confirm" onSubmit={handleSubmit}>
            <Input data={code} setData={setCode} placeholder={"Введите код"} />
            {/* <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input> */}
          </form>
          <button
            className={styles.button}
            form="recovery-confirm"
            type="submit"
          >
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

export default RecoveryCode;
