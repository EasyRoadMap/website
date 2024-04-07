import styles from "./styleUI.module.css";

// input without any borders, just plain text 
const RawInputForm = ({ data, setData, placeholder, ...props }) => {
    const changeValue = (e) => {
        setData(e.target.value);
    }

    return (
        <input className={[styles.input, props.className ? props.className : ""].join(" ")} 
                type="text" 
                placeholder={placeholder}
                onChange={() => changeValue()}
                value={data}
        />
    );
};

export default RawInputForm;