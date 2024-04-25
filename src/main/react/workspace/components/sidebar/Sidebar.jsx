import SidebarButton from "./SidebarButton.jsx";
import SidebarProjects from "./SidebarProjects.jsx";
import { getProjectsList } from "../../utils/getProjectsList.js";
import { useNavigate, useLocation } from "react-router-dom";
import { observeBlocks } from "../../utils/updateVisibleBlock.js";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import qs from "qs";

const pagesPaths = {
  main: "/workspace",
  projects: "/workspace/projects",
  project: "/workspace/project",
  settings: "/workspace/settings",
};

const placesInProjects = {
  main: "Основная информация",
  participants: "Участники",
  roadmap: "Дорожная карта",
};

const getProjectsFieldsRefs = () => {
  const main = document.querySelector("#main");
  const participants = document.querySelector("#participants");
  const roadmap = document.querySelector("#roadmap");

  if (!main || !participants || !roadmap) return false;

  return [main, participants, roadmap];
};

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight / 4 &&
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const getPage = (location) => {
  const path = location.pathname;
  const page = Object.keys(pagesPaths).find((key) => pagesPaths[key] === path);
  if (page) return page;
  return false;
};

const getProject = (location, refs) => {
  if (!refs) return false;
  let ref = null;
  for (let i = 0; i < refs.length; i++) {
    if (isInViewport(refs[i])) {
      // refs.forEach(t => t.classList.remove('active'));
      // refs[i].classList.add('active');
      ref = refs[i].id;
    }
  }
  return ref;
  // const observeBlock = observeBlocks(refs);
  // if (observeBlock) return observeBlock;
};

const Sidebar = () => {
  const { workspaceContext } = useWorkspaceContext();
  const location = useLocation();
  const navigate = useNavigate();

  const page = getPage(location);
  const [projectField, setProjectField] = useState(null);

  useEffect(() => {
    if (page === "project") {
      const projectFields = getProjectsFieldsRefs();
      setProjectField(getProject(location, projectFields));
      const onScroll = window.addEventListener(
        "scroll",
        () => setProjectField(getProject(location, projectFields)),
        true
      );
      return window.removeEventListener("scroll", onScroll);
    }
  }, []);

  const getWS = () => {
    const searchParam = qs.parse(location.search, { ignoreQueryPrefix: true });
    console.log("searchParam");
    console.log(searchParam);
    if (Object.keys(searchParam).length > 0) return "?ws_id=" + searchParam.ws_id;
    return "";
  }

  return (
    <aside className={styles.aside}>
      {/* pages + their props */}
      <SidebarButton
        type="main"
        active={page === "main"}
        callback={() => navigate("/workspace" + getWS())}
      />
      <SidebarButton
        type="projects"
        active={page === "projects"}
        callback={() => navigate("/workspace/projects" + getWS())}
      />
      <SidebarProjects
      projects={workspaceContext?.projects}
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
      />
      <SidebarButton
        type="settings"
        active={page === "settings"}
        callback={() => navigate("/workspace/settings" + getWS())}
      />
      <SidebarButton type="exit" active={false} callback={() => {}} />
    </aside>
  );
};

export default Sidebar;
