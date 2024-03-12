import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { signUpEmailCode } from "../../api/SignUpEmailCode.js";

import styles from "../../style.module.css";
import Logo from "../../components/Logo.jsx";
import Input from "../../components/Input.jsx";

function SetupAccount() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state.email;

  const passwordsMatches = () => {
    return password === repeatedPassword;
  }

  const buttonEnabled = () => {
    const isEmailEntered = email != "";
    const isPasswordEntered = password != "";
    const isRepeatedPasswordEntered = repeatedPassword != "";

    return isEmailEntered &&
           isPasswordEntered &&
           isRepeatedPasswordEntered &&
           passwordsMatches();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Setup: " + email);
    signUpEmailCode(email, name)
    .then(response => {
      console.log(response);
      navigate("/auth/sign-up/email-code", {state: {email: email, name: name, password: password}});
    })
    .catch(err => {
      alert("error happened");
    })
  }

  return (
    <>
     <div className={styles.mainPage}>
       <Logo></Logo>
       <h1 className={styles.title1}>Создание аккаунта</h1>
       <form id="sign-up" onSubmit={handleSubmit}>
        <Input 
          data={name}
          setData={setName}
          placeholder="Ваше имя"
        />
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
          disabled={!buttonEnabled()} 
          form="sign-up" 
          type="submit"
        >
          Продолжить
        </button>
     </div>
    </>
  );
}

export default SetupAccount;