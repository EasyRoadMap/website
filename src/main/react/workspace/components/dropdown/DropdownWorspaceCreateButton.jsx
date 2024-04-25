import styles from "./styles.module.css";
import AddWorkspaceSVG from "../../../assets/AddWorkspaceSVG.jsx";

const DropdownWorkspaceCreateButton = ({
  callback
}) => {
  return (
    <div className={styles.addSection} onClick={callback}>
      <AddWorkspaceSVG className={styles.AddWorkspaceSVG} />
      <div className={styles.addSectionText}>Новая рабочая область</div>
    </div>
  );
};

export default DropdownWorkspaceCreateButton;
