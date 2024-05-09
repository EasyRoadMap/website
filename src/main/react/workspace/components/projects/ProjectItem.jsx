import Button from "../UI/Button.jsx";
import AvatarsList from "./AvatarsList.jsx";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import useProjectContext from "../../hooks/useProjectContext.js";
import { useRoadmapInfo } from "../../hooks/useRoadmap.js";
import { useProjectInfo } from "../../hooks/useProject.jsx";
import { initProject } from "../../hooks/InitProject.js";

const ProjectItem = ({
    project,
    callback
}) => {
    const navigate = useNavigate();
    const { workspaceContext } = useWorkspaceContext();
    const { setProjectContext } = useProjectContext();

    const toProject = () => {
        if (project?.id && workspaceContext?.id) {
            setProjectContext((prev) => ({...prev, id: project.id}));
            navigate({
                pathname: "/workspace/project",
                search: '?ws_id='+workspaceContext.id+"&pr_id="+project.id,
                // key: project.id
            }, {
                state: {
                pr_id: project.id,
                replace: false
                }
            })
        }
    }
    
    const avatarClassName = project?.photo?.default ? [styles.avatar, styles.pixelAvatar].join(" ") : styles.avatar;

    return (
        <div className={styles.project}>
            <img src={project?.photo?.url} alt="" className={avatarClassName}/>
            <h1 className={styles.name}>{project?.name}</h1>
            <AvatarsList participants={project.participants}/>
            <Button text="Перейти" type="filledAccent" callback={toProject}/>
        </div>
    );
}

export default ProjectItem;