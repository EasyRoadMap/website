import SidebarButton from "./SidebarButton.jsx";
import SidebarProjects from "./SidebarProjects.jsx";
import { getProjectsList } from "../../utils/getProjectsList.js";
import { useLocation } from "react-router-dom";
import { observeBlocks } from "../../utils/updateVisibleBlock.js";
import styles from "./styles.module.css";

const pagesPaths = {
    main: "/workspace/",
    projects: "/workspace/projects",
    settings: "/workspace/settings"
}

const getPage = (location) => {
    // check if location in pagesPaths
}

const getProject = (location) => {
    // check if location is one of the projects paths
}

const placesInProjects = [
    "Основная информация",
    "Участники",
    "Дорожная карта"
]

const Sidebar = ({ // can be only one: page or project
    chosenPage = null,
    chosenProject = null // {projectId(?), placeInProject: main_info/participants/roadmap}
}) => {
    const location = useLocation();

    const projectsList = getProjectsList();
    const page = getPage(location);

    return (
        <aside className={styles.aside}>
            {/* pages + their props */}
            <SidebarButton type="main"/>
            <SidebarButton type="projects"/>
            <SidebarProjects projects={[
                {avatar: "", name: "Проект 1", toProject: () => {}, chosen: false, placeInProject: null, toPlace: () => {}},
                {avatar: "", name: "Проект 2", toProject: () => {}, chosen: false, placeInProject: null, toPlace: () => {}},
                {avatar: "", name: "Проект 3", toProject: () => {}, chosen: false, placeInProject: null, toPlace: () => {}},
                {avatar: "", name: "Проект 4", toProject: () => {}, chosen: false, placeInProject: null, toPlace: () => {}}
            ]}
            places={placesInProjects}
            />
            <SidebarButton type="settings"/>
        </aside>
    );
}

export default Sidebar;