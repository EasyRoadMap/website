import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function SignUp() {
  return (
    <>
     <div className={styles.mainPage}>
       <Logo></Logo>
       <h1 className={styles.title1}>Создание аккаунта</h1>
       <form id="sign-up">
          <input
            className={styles.input}
            placeholder="Ваше имя"
          ></input>
          <input
            className={styles.input}
            placeholder="Придумайте пароль"
          ></input>
          <input
            className={styles.input}
            placeholder="Повторите пароль"
          ></input>
       </form>
       <button className={styles.button}>Продолжить</button>
     </div>
    </>
  );
}

export default SignUp;