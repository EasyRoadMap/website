import styles from "./styles.module.css";

const DropdownWorkspaceButton = ({ workspace }) => {
  return (
    <div className={styles.dropdownWorkspaceButton}>
      <img src={workspace.avatar} alt="" className={styles.workspaceAvatar} />
      <div className={styles.workspaceName}>{workspace.name}</div>
    </div>
  );
};

export default DropdownWorkspaceButton;
