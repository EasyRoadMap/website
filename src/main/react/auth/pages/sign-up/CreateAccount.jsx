import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { validate } from "../../utils/emailValidation.js"

import styles from "../../style.module.css";
import Logo from "../../components/Logo.jsx";
import Input from "../../components/Input.jsx";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const buttonEnabled = () => {
    const isEmailEntered = email != "";
    return isEmailEntered &&
           checked; 
  }

  const showError = (description) => {
    alert(description);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(email)) {
      showError("Введите существующий email");
      return;
    }
    alert("asd");
    navigate("/auth/sign-up/setup-account", {state: {email}});
  }

  return (
    <>
     <div className={styles.mainPage}>
       <Logo></Logo>
       <h1 className={styles.title1}>Создание аккаунта</h1>
       <h2 className={styles.discription}>
         Ваш адрес эл. почты доступен для <br />
         регистрации, давайте создадим аккаунт!
       </h2>

       <form id="sign-up-email" onSubmit={handleSubmit}>
          <Input 
            data={email}
            setData={setEmail}
            placeholder={"Введите адрес эл.почты"}
          />
          <input
            type="checkbox"
            name="Я прочитал(а) условия пользовательского соглашения"
            className="mr-2 ml-2"
            checked={checked}
            onChange={() => setChecked(!checked)}
          ></input>
          <h2 className={styles.discription}>
          Я прочитал(а) условия <br />
          <strong className="text-black">
            <a className={styles.repeatLink} href="mailto:llnnnlly@gmail.com">
            пользовательского соглашения
            </a>
          </strong>
          </h2>
       </form>
       <button 
          type="submit"
          form="sign-up-email"
          className={styles.button}
          disabled={!buttonEnabled()}
          >
            Создать аккаунт
        </button>
       <button className={styles.button}>Указать другую почту</button>
     </div>
    </>
  );
}

export default CreateAccount;