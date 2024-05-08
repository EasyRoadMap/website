import styles from "./style.module.css";
import SidebarButton from "./SidebarButton.jsx";
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
      {/* <SidebarProjects
        projects={workspaceContext?.projects}
        chosen={projectField}
        blocks={getProjectsFieldsRefs()}
        // projects={[
        //   {
        //     avatar: "",
        //     name: "Проект 1",
        //     toProject: () => {
        //       navigate("/workspace/project");
        //     },
        //     blocks: getProjectsFieldsRefs(),
        //     chosen: projectField,
        //     placeInProject: null,
        //     toPlace: () => {},
        //   },
        // ]}
        places={placesInProjects}
      /> */}
    </aside>
  );
};

export default Sidebar;
