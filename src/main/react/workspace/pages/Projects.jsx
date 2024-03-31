import Header from "../components/header/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import ProjectsList from "../components/projects/ProjectsList.jsx";
import styles from "./styles.module.css";

const Projects = () => {
    return (
        <main className={styles.main}>
            <Header />
            <section className={styles.content}>
                <Sidebar />
                <section className={styles.centeredContent}>
                    <ProjectsList />
                </section>
            </section>
        </main>
    );
}

export default Projects;