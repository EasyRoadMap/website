import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function SignUpEmail() {
  return (
    <>
     <div className={styles.mainPage}>
       <Logo></Logo>
       <h1 className={styles.title1}>Создание аккаунта</h1>
       <h2 className={styles.discription}>
         Ваш адрес эл. почты доступен для <br />
         регистрации, давайте создадим аккаунт!
       </h2>

       <form id="sign-up-email">
          <input
            className={styles.input}
            placeholder="Введите адрес эл.почты"
          ></input>
           <input
             type="checkbox"
             name="Я прочитал(а) условия пользовательского соглашения"
             className="mr-2 ml-2"
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
       <button className={styles.button}>Создать аккаунт</button>
       <button className={styles.button}>Указать другую почту</button>
     </div>
    </>
  );
}

export default SignUpEmail;