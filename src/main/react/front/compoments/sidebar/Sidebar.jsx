import styles from "./style.module.css";
import SidebarButton from "./SidebarButton.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import SidebarProjects from "./SidebarProjects.jsx";

import useProjectContext from "../../hooks/useProjectContext.js";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { workspaceContext } = useWorkspaceContext();
  // const { projectContext } = useProjectContext();

  const getPage = () => {
    const path = "/" + location.pathname.split("/")[1] + "/" + params.ws_id;
    return path === location.pathname;
  }

  const handleScrollTo = (toBlock) => {
    const main = document.querySelector("main");
    const block = document.querySelector("#" + toBlock);
  
    main.scrollTo({
      top: block?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
    window.location.hash = "#" + toBlock;
  };

  return (
    <aside className={styles.aside}>
      <SidebarButton
        type="main"
        callback={() => navigate(`/p/${workspaceContext.id}`)}
        active={getPage()}
        // callback={() => navigate("/workspace" + getWS())}
      />
      <SidebarButton
        type="projects"
        // active={page === "projects"}
        callback={() => handleScrollTo("projects")}
      />
      <SidebarProjects
        projects={workspaceContext?.projects}
        // chosen={projectField}
        // blocks={getProjectsFieldsRefs()}
        // projects={[
        //   {
        //     avatar: "",
        //     name: "Проект 1",
        //     id: "1",
        //     blocks: "",
        //     chosen: false,
        //     placeInProject: null,
        //   },
        // ]}
        // places={placesInProjects}
      />
    </aside>
  );
};

export default Sidebar;
