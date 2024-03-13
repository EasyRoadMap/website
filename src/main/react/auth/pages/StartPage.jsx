import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";
import Input from "../components/Input.jsx";

import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Auth } from "../api/Auth.js";
import { validate } from "../utils/emailValidation.js";
import ThemeToggler from "../../common/components/ThemeToggler.jsx";

function StartPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const location = useLocation();

  if (location.state?.error) {
    setError(location.state?.error.descriptions);
    setEmail(location.state?.error.email);
  }

  // можно вынести в отдельный файл
  const errorCodes = {
    "incorrect_field_value": "Введите существующий email"
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(email)) {
      setError("Введите существующий email");
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
              setData={setEmail}
              clearError={() => {setError(null);}}
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
