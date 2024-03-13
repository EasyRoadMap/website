import styles from "../../style.module.css";
import Logo from "../../components/Logo.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/SignIn.js";
import { RecoveryEmailCode } from "../../api/RecoveryEmailCode.js";
import Input from "../../components/Input.jsx";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert("error happened in sign in");
      });
  };

  const getRecovery = () => {
    RecoveryEmailCode(email)
      .then((response) => {
        console.log(response);
        navigate("/auth/recovery/email-code", { state: { email: email } });
      })
      .catch((err) => {
        alert("error happened in sign in (recovery)");
      });
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.mainPage}>
          <Logo></Logo>
          <h1 className={styles.title}>Вход в аккаунт</h1>
          <form id="login" onSubmit={handleSubmit}>
            <Input
              data={email}
              setData={setEmail}
              placeholder="Введите адрес эл.почты"
            />
            <Input data={password} setData={setPassword} placeholder="Пароль" />
            <input
              id="check"
              type="checkbox"
              className={styles.checkbox}
            ></input>
            <label form="check">Запомни меня!</label>
          </form>
          <button type="submit" form="login" className={styles.button}>
            Войти
          </button>
          <a className={styles.forgotPassword} onClick={getRecovery}>
            Забыли пароль?
          </a>
        </div>
      </div>
    </>
  );
}

export default SignIn;
