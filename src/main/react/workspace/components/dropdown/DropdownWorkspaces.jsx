import DropdownWorkspaceButton from "./DropdownWorkspaceButton.jsx";
import DropdownWorkspaceCreateButton from "./DropdownWorspaceCreateButton.jsx";
import styles from "./styles.module.css";

const DropdownWorkspaces = ({
    workspaces
}) => {
    return (
        <div className={styles.dropdownWorkspaces}>
            <h1>
                Рабочие области
            </h1>
            {workspaces.map((workspace, i) => {
                return (
                    <DropdownWorkspaceButton workspace={workspace} key={i}/>
                );
            })}
            <DropdownWorkspaceCreateButton />
        </div>
    );
}

export default DropdownWorkspaces;