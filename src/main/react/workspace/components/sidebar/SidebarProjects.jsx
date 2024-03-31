import SidebarProjectButton from "./SidebarProjectButton.jsx";

const SidebarProjects = ({
    projects,
    places
}) => {
    return (
        <div>
            {projects.map((project, i) => {
                return (
                    <div key={i}>
                        <SidebarProjectButton project={project} places={places} />
                    </div>
                );
            })}
        </div>
    );
}

export default SidebarProjects;