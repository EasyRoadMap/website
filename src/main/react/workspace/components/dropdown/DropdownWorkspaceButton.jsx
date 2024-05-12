import styles from "./styles.module.css";
import useUserContext from "../../hooks/useUserContext.js";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { useNavigate } from "react-router-dom";
import { initWorkspace } from "../../hooks/InitWorkspace.js";
import { addWSID } from "../../utils/WSIDStorage.js";

const DropdownWorkspaceButton = ({ workspace }) => {
  const { userContext } = useUserContext();
  const { workspaceContext } = useWorkspaceContext(); 
  const { Workspace, Members, Projects } = useWorkspaceInfo();
  const navigate = useNavigate();

  const changeWorkspace = () => {
    if (workspace?.id) {
      addWSID(workspace.id);
      navigate({
        pathname: "/workspace",
        search: '?ws_id='+workspace.id
      })
      userContext.currentWorkspace = workspace;
      initWorkspace(Workspace, Members, Projects, workspace.id);
    }
  }

  const avatarClassName = workspace?.photo?.default ? [styles.workspaceAvatar, styles.pixelAvatar].join(" ") : styles.workspaceAvatar;

  return (
    <button className={
      (workspace?.id && workspace?.id === workspaceContext?.id) ? [styles.dropdownWorkspaceButton, styles.dropdownWorkspaceButtonActive].join(" ") : styles.dropdownWorkspaceButton
    }
    onClick={changeWorkspace}
    >
      <img src={workspace?.photo?.url} alt="" className={avatarClassName} />
      <div className={styles.workspaceName}>{workspace?.info?.name}</div>
    </button>
  );
};

export default DropdownWorkspaceButton;
