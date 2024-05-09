import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import useWorkspaceContext from "../../hooks/useWorkspaceContext";

const SidebarProjectButton = ({ project, chosen, blocks, places }) => {
  const avatarClassName = project?.photo?.default
    ? [styles.avatar, styles.pixelAvatar].join(" ")
    : styles.avatar;

    const navigate = useNavigate();
    const { workspaceContext } = useWorkspaceContext();

    const toProject = () => {
      if (!workspaceContext?.id || !project?.id) return;
      navigate(`/p/${workspaceContext.id}/${project.id}`)
    }

  return (
    <div className={styles.projectButtonWrapper}>
      <button className={styles.projectdiv}
              onClick={toProject}
      >
        <img src={project?.photo?.url} alt="" className={avatarClassName} />
        <span className={styles.name}>{project?.info?.name}</span>
      </button>
      {/* {chosen && project?.id === projectContext?.id && (
        <>
          <hr />
          <div className={styles.placesInProject}>
            {placesList.map((place, i) => {
              const keyByValue = Object.keys(places).find(
                (key) => places[key] === place
              );
              const isKeyChosen = keyByValue === chosen;
              const className = isKeyChosen ? styles.activePlaceButton : "";
              return <span className={className}>{place}</span>;
            })}
          </div>
        </>
      )} */}
    </div>
  );
};

export default SidebarProjectButton;
