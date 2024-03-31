import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import WorkspaceMainInfo from "../components/WorkspaceMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";
import styles from "./styles.module.css";

const Main = () => {
    return (
        <main className={styles.main}>
            <Header />
            <section className={styles.content}>
                <Sidebar />
                <section className={styles.centeredContent}>
                    <WorkspaceMainInfo />
                    <Participants />    
                </section>
            </section>
        </main>
    );
}

export default Main;