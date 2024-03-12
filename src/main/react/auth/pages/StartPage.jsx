import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function StartPage() {
  return (
    <>
      <div className={styles.mainPage}>
        <Logo></Logo>
        <h1 className={styles.title}>Добро Пожаловать</h1>
        <form id="greeting">
          <input
            className={styles.input}
            placeholder="Введите адрес эл.почты"
          ></input>
        </form>
        <button type="submit" form="greeting" className={styles.button}>
          Продолжить
        </button>
      </div>
    </>
  );
}

export default StartPage;