import styles from "./styleUI.module.css";

const TextLink = ({ data, placeholder, type, loading = null }) => {
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
        value={data}
        disabled={loading}
        readonly="readonly"
      />
    );

  if (loading === null || loading === false) {
    return <form className={styles.formLink}>{inputField}</form>;
  }
};

export default TextLink;
