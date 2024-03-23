import styles from "../style.module.css";
import styleBtn from "../pages/button.module.css";
import Base from "./Base.jsx";
import { trySignIn } from "../api/WorkspaceAddresser.js";
import { useState, useEffect } from "react";
import { useEmail } from "../hooks/useEmail.js";
import { useLocation, useNavigate } from "react-router-dom";

const preventUnacceptableEnter = (location, navigate) => {
  if (!location.state?.haveAccess) {
    navigate("/auth/sign-in");
  }
};

function Form({ description, buttonText }) {
  const [check, setCheck] = useState(false);
  const [pending, setPending] = useState(false);
  const { email } = useEmail();
  const navigate = useNavigate();
  const location = useLocation();
  const password = location.state?.password;

  useEffect(() => {
    preventUnacceptableEnter(location, navigate);
  }, []);

  return (
    <>
      <h2 className={styles.discription}>{description}</h2>
      <div className={styles.checkboxWrapper}>
        <input
          id="check"
          type="checkbox"
          className={styles.checkbox}
          disabled={pending}
          onChange={() => {
            setCheck(!check);
          }}
        ></input>
        <label
          for="check"
        >
          Запомни меня!
        </label>
      </div>

      <button
        className={styleBtn.buttonFilledAccent}
        disabled={pending}
        onClick={() => {
          trySignIn(email, password, check, setPending);
        }}
      >
        {buttonText}
      </button>
    </>
  );
}

const Complete = ({ header, description, buttonText }) => {
  return (
    <Base
      header={header}
      children={<Form buttonText={buttonText} description={description} />}
    />
  );
};

export default Complete;
