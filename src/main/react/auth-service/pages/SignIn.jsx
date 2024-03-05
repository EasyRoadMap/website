import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function SignIn() {
  return (
    <>
      <div className={styles.mainPage}>
        <Logo></Logo>
        <h1 className={styles.title}>Вход в аккаунт</h1>
        <form id="login">
          <input
            className={styles.input}
            placeholder="Введите адрес эл.почты"
          ></input>
          <input className={styles.input} placeholder="Пароль"></input>
          <input
            type="checkbox"
            name="Запомни меня!"
            className="mr-2 ml-2"
          ></input>
          <label>Запомни меня!</label>
        </form>
        <button type="submit" from="login" className={styles.button}>
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