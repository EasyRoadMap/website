import styles from "../style.module.css";
import Base from "./Base.jsx";
import { trySignIn } from "../api/WorkspaceAddresser.js";
import { useState } from "react";
import { useEmail } from "../hooks/useEmail.js";
import { useLocation } from "react-router-dom";

function Form({
    description,
    buttonText
}) {
  const [check, setCheck] = useState(false);
  const [pending, setPending] = useState(false);
  const {email} = useEmail();
  const location = useLocation();
  const password = location.state?.password;

  return (
    <>
        <h2 className={styles.discription}>{description}</h2>
        <input
            id="check"
            type="checkbox"
            className={styles.checkbox}
            disabled={pending}
        ></input>
        <label for="check" onChange={() => {setCheck(!check)}}>Запомни меня!</label>
        <button 
            className={styles.button} 
            disabled={pending}
            onClick={() => {trySignIn(
                email, password, check, setPending
            );}}
        >
            {buttonText}
        </button>
    </>
  );
}

const Complete = ({
    header,
    description,
    buttonText
}) => {
    return (
        <Base header={header} children={<Form 
            buttonText={buttonText}
            description={description}
        />}/>
    );
}

export default Complete;
