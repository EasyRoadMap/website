import styles from "./styles.module.css";

const UserHeaderButton = ({
    name
}) => {
    return (
        <div className={styles.userButton}>
            <div className={styles.avatarCircle}></div>
            <div className={styles.username}>
                {name}
            </div>
        </div>
    );
}

export default UserHeaderButton;