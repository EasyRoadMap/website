import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";
import axios from "axios";
import { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendData = () => {
    const URL = "/auth/sign-in";
    const TOKEN = document.getElementsByName("_csrf")[0].value;

    const bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);

    axios({
      method: "post",
      url: URL,
      data: bodyFormData,
      headers: { 
        "X-CSRF-TOKEN": TOKEN,
        "Content-Type": "multipart/form-data" 
      },
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const changeEmailValue = (e) => {
    setEmail(e.target.value);
  }

  const changePasswordValue = (e) => {
    setPassword(e.target.value);
  }

  return (
    <>
      <div className={styles.mainPage}>
        <Logo></Logo>
        <h1 className={styles.title}>Вход в аккаунт</h1>
        <form id="login">
          <input
            onChange={changeEmailValue}
            className={styles.input}
            placeholder="Введите адрес эл.почты"
          ></input>
          <input 
            onChange={changePasswordValue}
            className={styles.input} 
            placeholder="Пароль"
          ></input>
          <input
            type="checkbox"
            name="Запомни меня!"
            className="mr-2 ml-2"
          ></input>
          <label>Запомни меня!</label>
        </form>
        <button onClick={sendData} from="login" className={styles.button}>
          Войти
        </button>
        <button type="submit" from="login" className={styles.button}>
          Забыли пароль?
        </button>
      </div>
    </>
  );
}

export default SignIn;