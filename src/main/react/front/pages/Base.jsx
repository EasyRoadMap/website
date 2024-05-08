import styles from "./styles.module.css";
import Sidebar from "../compoments/sidebar/Sidebar.jsx";
import Header from "../compoments/header/Header.jsx";

const Base = ({ children }) => {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.content}>
        <Sidebar />
        <section className={styles.centeredContent}>{children}</section>
      </section>
    </main>
  );
};

export default Base;
