import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function RecoveryCode() {
  return (
    <>
      <div className={styles.mainPage}>
        <Logo></Logo>
        <h1 className={styles.title1}>Восстановление доступа</h1>
        <h2 className={styles.discription}>
          Код восстановления был отправлен на <br />
          <strong className="text-black">
            <a href="mailto:llnnnlly@gmail.com">user.email@domain.ru</a>
          </strong>
          , введите его здесь:
        </h2>
        <form>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
          <input className={styles.verification} maxLength="1"></input>
        </form>
        <button className={styles.button}>Войти</button>
        <h2 className={styles.discription}>
          Не получили письмо с кодом? <br />
          <strong className="text-black">
            <a className={styles.repeatLink} href="mailto:llnnnlly@gmail.com">
              Повторить отправку
            </a>
          </strong>
          &nbsp;(10 сек)
        </h2>
      </div>
    </>
  );
}

export default RecoveryCode;