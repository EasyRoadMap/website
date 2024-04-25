import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import { initProject } from "../../hooks/InitProject.js";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import useProjectContext from "../../hooks/useProjectContext.js"; 

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
  window.location.hash = "#" + toBlock;
};

const SidebarProjectButton = ({ project, places }) => {
  const placesList = Object.values(places);
  const navigate = useNavigate();

  const { workspaceContext } = useWorkspaceContext();
  const { Project, Members } = useProjectContext();

  console.log("in button");
  console.log(places);
  console.log(project);

  const toProject = () => {
    if (project?.id && workspaceContext?.id) {
      navigate({
        pathname: "/workspace/project",
        search: '?ws_id='+workspaceContext.id+"&pr_id="+project.id
      })
      initProject(Project, Members, project.id);
    }
  }

  return (
    <div className={styles.projectButtonWrapper}>
      <button onClick={toProject} className={styles.projectdiv}>
        <img src={project.avatar} alt="" className={styles.avatar} />
        <span className={styles.name}>{project.name}</span>
      </button>
      {project.chosen && (
        <>
          <hr />
          <div className={styles.placesInProject}>
            {placesList.map((place, i) => {
              const keyByValue = Object.keys(places).find(
                (key) => places[key] === place
              );
              const isKeyChosen = keyByValue === project.chosen;
              const className = isKeyChosen ? styles.activePlaceButton : "";
              return (
                <span
                  className={className}
                  onClick={() => handleScrollTo(project.blocks, keyByValue)}
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
