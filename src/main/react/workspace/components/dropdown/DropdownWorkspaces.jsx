import DropdownWorkspaceButton from "./DropdownWorkspaceButton.jsx";
import DropdownWorkspaceCreateButton from "./DropdownWorspaceCreateButton.jsx";
import styles from "./styles.module.css";

const DropdownWorkspaces = ({ workspaces }) => {
  return (
    <div className={styles.dropdownWorkspaces}>
      <span className={styles.dropdownWorkspacesTitle}>Рабочие области</span>
      {workspaces.map((workspace, i) => {
        return <DropdownWorkspaceButton workspace={workspace} key={i} />;
      })}
      <DropdownWorkspaceCreateButton />
    </div>
  );
};

export default DropdownWorkspaces;
