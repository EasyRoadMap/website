import styles from "./button.module.css";

const Button = ({
    text,
    type, // filled, outline etc
    callback,
    ...props
}) => {
    return (
        <button
            className={[styles.btn, styles.buttonFilledAccent].join(" ")}
        >
            {text}
        </button>
    );
}

export default Button;