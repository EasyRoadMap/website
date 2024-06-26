import styles from "./button.module.css";

const types = {
    filledAccent: styles.buttonFilledAccent,
    filledSecondary: styles.buttonFilledSecondary,
    outlineAccent: styles.buttonOutlineAccent,
    outlineSecondary: styles.buttonOutlineSecondary,
    outlineError: styles.buttonOutlineError, // TODO
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
            style={props?.style}
            onClick={callback}
            disabled={props?.disabled}
        >
            {text}
        </button>
    );
}

export default Button;