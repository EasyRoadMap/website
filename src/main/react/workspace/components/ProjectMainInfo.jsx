import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css"

const ProjectMainInfo = ({
    logo,
    projectInfo // name, description, links
}) => {
    return (
        <section className={styles.section}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.info}>
            <h1>
                Основная информация
            </h1>
            <TextField title="Название проекта" placeholder="Название проекта"/>
            <TextField title="Описание проекта" placeholder="Описание проекта"/>
            <TextField title="Ссылки" placeholder="Ссылка 1"/>
            <TextField placeholder="Ссылка 2"/>
            <TextField placeholder="Ссылка 3"/>
        </div>
    </section>
    );
}

export default ProjectMainInfo;