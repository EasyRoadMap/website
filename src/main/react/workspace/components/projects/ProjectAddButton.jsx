import styles from "./styles.module.css";
import AddProjectSVG from "../../../assets/AddProject.jsx";
import Button from "../UI/Button.jsx";
import { useProjectInfo } from "../../hooks/useProject.jsx";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { usePopupManager } from "react-popup-manager";
import Popup from "../popup/Popup.jsx";
import CreateProjectPopup from "../popup/CreateProjectPopup.jsx";
import { useNavigate } from "react-router-dom";

const ProjectAddButton = ({ projectsCount }) => {
  const { CreateProject } = useProjectInfo();
  const { Projects } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();
  const navigate = useNavigate();
  const popupManager = usePopupManager();

  const toProject = (project, workspaceContext) => {
    if (project?.id && workspaceContext?.id) {
      Projects();
      navigate(
        {
          pathname: "/workspace/project",
          search: "?ws_id=" + workspaceContext.id + "&pr_id=" + project.id,
        },
        {
          state: {
            pr_id: project.id,
            replace: false,
          },
        }
      );
    }
  };

  const onCreateProject = (...params) => {
    if (
      params?.[0]?.button === "create" &&
      workspaceContext?.id &&
      params?.[0]?.name
    )
      CreateProject(
        workspaceContext?.id,
        params?.[0]?.name,
        params?.[0]?.description,
        params?.[0]?.date,
        (project) => toProject(project, workspaceContext)
      );
  };

  const openCreateProjectPopup = (...params) => {
    popupManager.open(Popup, {
      popup: {
        component: CreateProjectPopup,
      },
      onClose: onCreateProject,
    });
  };

  return (
    <div
      className={projectsCount > 0 ? styles.addProject : styles.addProjectNone}
    >
      <div className={styles.addLogo}>
        <AddProjectSVG />
      </div>
      <Button
        text="Создать новый"
        type="filledAccent"
        callback={openCreateProjectPopup}
      />
    </div>
  );
};

export default ProjectAddButton;
