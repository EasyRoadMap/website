import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function Recovery() {
  return (
    <>
      <div className={styles.mainPage}>
        <Logo></Logo>
        <h1 className={styles.title}>Восстановление доступа</h1>
        <form>
          <input
            className={styles.input}
            placeholder="Придумайте новый пароль"
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

export default Recovery;