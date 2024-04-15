import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import styles from "./styles.module.css";
import AlertPopup from "../components/popup/AlertPopup.jsx";

const Base = ({popup, children}) => {
  return (
    <main className={styles.main}>
      {/* <AlertPopup type={popup?.type}
                  title={popup?.title} 
                  description={popup?.description}
                  callbacks={popup?.callbacks}
                  openPopup={popup?.openPopup}
      /> */}
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