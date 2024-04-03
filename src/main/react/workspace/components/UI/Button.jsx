import styles from "./button.module.css";

const types = {
    filledAccent: styles.buttonFilledAccent,
    filledSecondary: styles.buttonFilledSecondary,
    outlineAccent: styles.buttonOutlineAccent,
    outlineSecondary: styles.buttonOutlineSecondary
}

const Button = ({
    text,
    type, // filled, outline etc
    callback,
    ...props
}) => {
    return (
        <button
            className={[styles.btn, types[type]].join(" ")}
        >
            {text}
        </button>
    );
}

export default Button;