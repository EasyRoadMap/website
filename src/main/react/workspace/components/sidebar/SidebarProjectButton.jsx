import styles from "./styles.module.css";

const SidebarProjectButton = ({
    project,
    places
}) => {
    return (
        <div onClick={project.toProjects}>
            <img src={project.avatar} alt="" />
            <span>
                {project.name}
            </span>
            {project.chosen &&
            <>
                <hr />
                <div className={styles.placesInProject}>
                    {places.map((place, i) => {
                        return (
                            <span>
                                {place}
                            </span>
                        );
                    })}
                </div>
            </>
            }
        </div>
    );
}

export default SidebarProjectButton;