import styles from "../../style.module.css";
import Logo from "../../components/Logo.jsx";
import Input from "../../components/Input.jsx";

import { useState } from "react";
import { useLocation } from "react-router-dom";

import { RecoverySetPassword } from "../../api/RecoverySetPassword.js";

function Recovery() {
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const location = useLocation();

  const email = location.state.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rec Confirmation: " + email);
    RecoverySetPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert("error happened in recovery set password");
      });
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.mainPage}>
          <Logo></Logo>
          <h1 className={styles.title}>Восстановление доступа</h1>
          <form id="recovery-set-password" onSubmit={handleSubmit}>
            <Input
              data={password}
              setData={setPassword}
              placeholder="Придумайте пароль"
            />
            <Input
              data={repeatedPassword}
              setData={setRepeatedPassword}
              placeholder="Повторите пароль"
            />
          </form>
          <button
            className={styles.button}
            form="recovery-set-password"
            type="submit"
          >
            Продолжить
          </button>
        </div>
      </div>
    </>
  );
}

export default Recovery;
