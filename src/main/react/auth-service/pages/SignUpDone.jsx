import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function SignUpDone() {
  return (
    <>
     <div className={styles.mainPage}>
       <Logo></Logo>
       <h1 className={styles.title1}>Создание аккаунта</h1>
       <h2 className={styles.discription}>
         Ваш аккаунт готов!
       </h2>
       <button className={styles.button}>Начать работу</button>
     </div>
    </>
  );
}

export default SignUpDone;