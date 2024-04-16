import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import styles from "./styles.module.css";

const Base = ({popup, children}) => {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.content}>
        <Sidebar />
        <section className={styles.centeredContent}>
            {children}
        </section>
      </section>
    </main>
  );
};

export default Base;