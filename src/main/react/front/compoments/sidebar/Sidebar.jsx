import styles from "./style.module.css";
import SidebarButton from "./SidebarButton.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import SidebarProjects from "./SidebarProjects.jsx";

import useProjectContext from "../../hooks/useProjectContext.js";

const Sidebar = ({ sidebarRef }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { workspaceContext } = useWorkspaceContext();
  // const { projectContext } = useProjectContext();

  const getPage = () => {
    const path = "/" + location.pathname.split("/")[1] + "/" + params.ws_id;
    return path === location.pathname;
  };

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
    <div className={styles.wrapper} ref={sidebarRef}>
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
        <SidebarProjects projects={workspaceContext?.projects} />
      </aside>
    </div>
  );
};

export default Sidebar;
