import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import { initProject } from "../../hooks/InitProject.js";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import useProjectContext from "../../hooks/useProjectContext.js";
import { useProjectInfo } from "../../hooks/useProject.jsx";

const getBlock = (blocks, toBlock) => {
  let block = null;
  blocks.values().forEach((value) => {
    if (value.id === toBlock) {
      block = value;
      return block;
    }
  });
  return block;
};

const handleScrollTo = (blocks, toBlock) => {
  const block = getBlock(blocks, toBlock);
  if (!block) return;
  const main = document.querySelector("main");

  main.scrollTo({
    top: block?.offsetTop,
    left: 0,
    behavior: "smooth",
  });
  history.pushState(null, null, "#" + toBlock);
  // window.location.replace("#" + toBlock);
};

const SidebarProjectButton = ({ project, chosen, blocks, places }) => {
  const placesList = Object.values(places);
  const navigate = useNavigate();

  const { workspaceContext } = useWorkspaceContext();
  const { projectContext, setProjectContext } = useProjectContext();
  const { Project, Members } = useProjectInfo();

  const toProject = () => {
    if (project?.id && workspaceContext?.id) {
      console.debug("project.id", project.id);
      setProjectContext((prev) => ({ ...prev, id: project.id }));
      navigate(
        {
          pathname: "/workspace/project",
          search: "?ws_id=" + workspaceContext.id + "&pr_id=" + project.id,
          // key: project.id
        },
        {
          state: {
            pr_id: project.id,
            replace: false,
          },
        }
      );
      // initProject(Project, Members, getStages, project.id);
    }
  };

  const avatarClassName = project?.photo?.default
    ? [styles.avatar, styles.pixelAvatar].join(" ")
    : styles.avatarUser;

  return (
    <div className={styles.projectButtonWrapper}>
      <button onClick={toProject} className={styles.projectdiv}>
        <img src={project?.photo?.url} alt="" className={avatarClassName} />
        <span className={styles.name}>{project?.name}</span>
      </button>
      {chosen && project?.id === projectContext?.id && (
        <>
          <hr />
          <div className={styles.placesInProject}>
            {placesList.map((place, i) => {
              const keyByValue = Object.keys(places).find(
                (key) => places[key] === place
              );
              const isKeyChosen = keyByValue === chosen;
              const className = isKeyChosen ? styles.activePlaceButton : "";
              return (
                <span
                  className={className}
                  onClick={() => handleScrollTo(blocks, keyByValue)}
                >
                  {place}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarProjectButton;
