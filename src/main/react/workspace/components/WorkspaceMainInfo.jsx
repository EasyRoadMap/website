import TextField from "./UI/TextField.jsx";
import styles from "./workspaceMainInfoStyle.module.css";

const WorkspaceMainInfo = ({
    logo,
    workspaceInfo // name, description, links
}) => {
    return (
        <section className={styles.section}>
            <img src={logo} alt="" className={styles.logo} />
            <div className={styles.info}>
                <h1>
                    Основная информация
                </h1>
                <TextField title="Название" placeholder="Название рабочей области"/>
                <TextField title="Описание" placeholder="Описание рабочей области"/>
            </div>
        </section>
    );
}

export default WorkspaceMainInfo;