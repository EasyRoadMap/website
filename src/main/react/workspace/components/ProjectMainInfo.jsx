import TextField from "./UI/TextField.jsx";

const ProjectMainInfo = ({
    logo,
    workspaceInfo // name, description, links
}) => {
    return (
        <section className={styles.section}>
            <img src={logo} alt="" />
            <h1>
                Основная информация
            </h1>
            <TextField title="Название проекта" placeholder="Название проекта"/>
            <TextField title="Описание проекта" placeholder="Описание проекта"/>
            <TextField title="Ссылки" placeholder="Ссылка 1"/>
            <TextField placeholder="Ссылка 2"/>
            <TextField placeholder="Ссылка 3"/>
        </section>
    );
}

export default ProjectMainInfo;