import styles from "../style.module.css";

const ForgotPasswordButton = ({text, callback, active}) => {
    return (
        <div className={styles.forgotPasswordWrapper}>
            <div className={active ? styles.forgotPassword : styles.forgotPasswordDisabled}
                onClick={active ? callback : () => {}}
                >
                    {text}
            </div>
        </div>
    );
}

export default ForgotPasswordButton;