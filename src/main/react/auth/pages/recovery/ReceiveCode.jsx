// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useEmail } from "../../hooks/useEmail.js";

// import styles from "../../style.module.css";
// import Logo from "../../components/Logo.jsx";
// import Input from "../../components/Input.jsx";

// import { RecoveryConfirmEmail } from "../../api/RecoveryConfirmEmail.js";

// function RecoveryCode() {
//   const [code, setCode] = useState("");
//   const [error, setError] = useState("");

//   const {email} = useEmail();

//   const navigate = useNavigate();

//   const getError = (error_data) => {
//     const errorCodes = {
//       "user_not_found": "Пользователь не найден",
//       "request_not_confirmed": "Сервис временно недоступен, повторите позже",
//       "wrong_proof_key": "Сервис временно недоступен, повторите позже",
//       "request_expired": "Время запроса истекло",
//       "no_more_attempts": "Попытки отправить код закончились",
//       "wrong_code": "Неверный код"
//     }

//     const error_code = error_data.error_code
//     if (error_code === "incorrect_field_value") {
//       if (error_data.field_name === "email") {
//         navigate("/auth", {state: {error: "Введите существующий email"}});
//         return "";
//       } else if (error_data.field_name === "code") {
//         return "Неверный код подтверждения";
//       }
//     }

//     return errorCodes[error_code];
//   }
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Rec Confirmation: " + email);
//     RecoveryConfirmEmail(email, code)
//       .then((response) => {
//         console.log(response);
//         navigate("/auth/recovery/set-password");
//       })
//       .catch((err) => {
//         const errorMessage = getError(err.response.data);
//         setError(errorMessage);
//       });
//   };

//   return (
//     <>
//       <div className={styles.background}>
//         <div className={styles.mainPage}>
//           <Logo></Logo>
//           <h1 className={styles.title1}>Восстановление доступа</h1>
//           <h2 className={styles.discription}>
//             Код восстановления был отправлен на <br />
//             <strong className="text-black">
//               {email}
//             </strong>
//             , введите его здесь:
//           </h2>
//           <form id="recovery-confirm" onSubmit={handleSubmit}>
//             <Input 
//               data={code} 
//               setData={setCode} 
//               placeholder={"Введите код"} 
//               error={error}
//               clearError={() => {setError("");}}
//             />
//           </form>
//           <button
//             className={styles.button}
//             form="recovery-confirm"
//             type="submit"
//           >
//             Войти
//           </button>
//           <h2 className={styles.discription}>
//             Не получили письмо с кодом? <br />
//             <strong className="text-black">
//               <a className={styles.repeatLink} href="mailto:llnnnlly@gmail.com">
//                 Повторить отправку
//               </a>
//             </strong>
//             &nbsp;(10 сек)
//           </h2>
//         </div>
//       </div>
//     </>
//   );
// }

// export default RecoveryCode;
import ConfirmationCode from "../ConfirmationCode.jsx";
import { RecoveryConfirmEmail } from "../../api/RecoveryConfirmEmail.js";
import { errorsHandler } from "../../utils/errorsHandler.js";

const tryConfirmEmail = (email, code, showPopup, setters, navigateLinks, navigate) => {
  RecoveryConfirmEmail(email, code)
  .then((response) => {
    navigate("/auth/recovery/change-password");
  })
  .catch((err) => {
    const errData = err.response.data;
    errorsHandler(errData, showPopup, setters, navigateLinks);
  });
}

const RecoveryCode = () => {
  return (
    <ConfirmationCode 
      header={"Введите код"}
      APICallback={tryConfirmEmail}
      linksToPagesThatCanIncludeErrors={{
        "email": "/auth/sign-in", 
        "password": "/auth/sign-in"
      }}
    />
  );
}

export default RecoveryCode;