import styles from "./style.module.css";
import SidebarButton from "./SidebarButton.jsx";
import SidebarProjects from "./SidebarProjects.jsx";

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      {/* pages + their props */}
      <SidebarButton
        type="main"
        // active={page === "main"}
        // callback={() => navigate("/workspace" + getWS())}
      />
      <SidebarButton
        type="projects"
        // active={page === "projects"}
        // callback={() => navigate("/workspace/projects" + getWS())}
      />
      <SidebarProjects
        // projects={workspaceContext?.projects}
        // chosen={projectField}
        // blocks={getProjectsFieldsRefs()}
        projects={[
          {
            avatar: "",
            name: "Проект 1",
            id: "1",
            blocks: "",
            chosen: false,
            placeInProject: null,
          },
        ]}
        // places={placesInProjects}
      />
    </aside>
  );
};

export default Sidebar;
