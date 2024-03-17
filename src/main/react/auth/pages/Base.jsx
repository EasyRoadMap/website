import styles from "../style.module.css";
import Logo from "../components/Logo.jsx";

function Base({
    header,
    children
}) {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.mainPage}>
          <Logo></Logo>
          <h1 className={styles.title}>{header}</h1>
          {children}
        </div>
      </div>
    </>
  );
}

export default Base;
