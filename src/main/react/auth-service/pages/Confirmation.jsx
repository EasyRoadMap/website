import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function Confirmation() {
  return (
    <>
     <div className={styles.mainPage}>
       <Logo></Logo>
       <h1 className={styles.title1}>Подтверждение почты</h1>
       <h2 className={styles.discription}>
         Код подтверждения был отправлен на <br />
         <strong className="text-black">
           <a href="mailto:llnnnlly@gmail.com">user.email@domain.ru</a>
         </strong>
         , введите его здесь:
       </h2>
       <form id="confirmation">
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

export default Confirmation;