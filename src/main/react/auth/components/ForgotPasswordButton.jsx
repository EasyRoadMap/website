import styles from "../style.module.css";

const ForgotPasswordButton = ({text, callback, active}) => {
    return (
        <div className={active ? styles.forgotPassword : styles.forgotPasswordDisabled}
           onClick={active ? callback : () => {}}
        >
            {text}
        </div>
    );
}

export default ForgotPasswordButton;