import styles from "./styles.module.css";
import useUserContext from "../../hooks/useUserContext.js";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import { useNavigate } from "react-router-dom";
import { initWorkspace } from "../../hooks/InitWorkspace.js";

const DropdownWorkspaceButton = ({ workspace }) => {
  const { userContext } = useUserContext();
  const { Workspace, Members, Projects } = useWorkspaceInfo();
  const navigate = useNavigate();
  
  console.log("JJJJJJ");
  console.log(workspace?.id);
  console.log(userContext);

  const changeWorkspace = () => {
    if (workspace?.id) {
      navigate({
        pathname: location.pathname,
        search: '?ws_id='+workspace.id
      })
      userContext.currentWorkspace = workspace;
      initWorkspace(Workspace, Members, Projects, workspace.id);
    }
  }

  const avatarClassName = workspace?.photo?.default ? [styles.workspaceAvatar, styles.pixelAvatar].join(" ") : styles.workspaceAvatar;

  return (
    <button className={
      (workspace?.id && workspace?.id === userContext?.currentWorkspace?.id) ? [styles.dropdownWorkspaceButton, styles.dropdownWorkspaceButtonActive].join(" ") : styles.dropdownWorkspaceButton
    }
    onClick={changeWorkspace}
    >
      <img src={workspace?.photo?.url} alt="" className={avatarClassName} />
      <div className={styles.workspaceName}>{workspace?.info?.name}</div>
    </button>
  );
};

export default DropdownWorkspaceButton;
