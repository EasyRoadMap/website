import styles from "./styleUI.module.css";

const TextLink = ({ data, setData, placeholder, type, loading = null }) => {
  console.log("INPUT");
  console.log(data);

  const changeValue = (e) => {
    setData(e.target.value);
  };

  const inputField =
    type === "textarea" ? (
      <textarea
        className={[styles.input, styles.textarea].join(" ")}
        type="text"
        placeholder={placeholder}
        onChange={changeValue}
        value={data}
        disabled={loading}
      />
    ) : (
      <input
        className={styles.inputLinkVisitorPage}
        type="text"
        placeholder={placeholder}
        onChange={changeValue}
        value={data}
        disabled={loading}
      />
    );

  if (loading === null || loading === false) {
    return <form className={styles.form}>{inputField}</form>;
  }
};

export default TextLink;
