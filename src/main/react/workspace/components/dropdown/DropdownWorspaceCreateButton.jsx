import styles from "./styles.module.css";

const DropdownWorkspaceCreateButton = () => {
    return (
        <div className={styles.addSection}>
            {/* логотип */}
            <div className={styles.addSectionText}>
                Новая рабочая область
            </div>
        </div>
    );
}

export default DropdownWorkspaceCreateButton;