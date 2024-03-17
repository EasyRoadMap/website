import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";
import Input from "../components/Input.jsx";

import { useState } from "react";
import { useLocation } from "react-router-dom";

import { useEmail } from "../hooks/useEmail.js";
import { Auth } from "../api/Auth.js";
import ThemeToggler from "../../common/components/ThemeToggler.jsx";

function StartPage() {
  // const [email, setEmail] = useState("");
  const {email, setEmail, saveEmail, removeEmail} = useEmail();
  const [error, setError] = useState(null);

  const location = useLocation();

  if (location.state?.error) {
    setError(location.state?.error);
  }

  // можно вынести в отдельный файл
  const errorCodes = {
    "incorrect_field_value": "Введите существующий email"
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      saveEmail(email);
    } catch(err) {
      setError(err.message);
      return;
    }

    Auth(email)
      .then((response) => {
        console.log(response);
        document.location.replace(response.request.responseURL);
      })
      .catch((err) => {
        console.log(err.response.data.error_code);
        setError(errorCodes[err.response.data.error_code]);
      });
  }

  return (
    <>
      <div className={styles.background}>
        <div className={styles.mainPage}>
          <Logo></Logo>
          <h1 className={styles.title}>Добро Пожаловать</h1>
          <form id="greeting" onSubmit={handleSubmit}>
            <Input 
              data={email}
              // setData={setEmail}
              setData={setEmail}
              clearError={() => {setError("");}}
              placeholder="Введите адрес эл.почты"
              error={error}
            />
          </form>
          <button type="submit" form="greeting" className={styles.button}>
            Продолжить
          </button>
          <ThemeToggler></ThemeToggler>
        </div>
      </div>
    </>
  );
}

export default StartPage;
