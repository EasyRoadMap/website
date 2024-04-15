import SidebarButton from "./SidebarButton.jsx";
import SidebarProjects from "./SidebarProjects.jsx";
import { getProjectsList } from "../../utils/getProjectsList.js";
import { useLocation } from "react-router-dom";
import { observeBlocks } from "../../utils/updateVisibleBlock.js";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

const pagesPaths = {
    main: "/workspace",
    projects: "/workspace/projects",
    settings: "/workspace/settings"
}

const placesInProjects = {
    main: "Основная информация",
    participants: "Участники",
    roadmap: "Дорожная карта"
}

const getProjectsFieldsRefs = () => {
    const main = document.querySelector("#main");
    const participants = document.querySelector("#participants");
    const roadmap = document.querySelector("#roadmap");

    if (!main || !participants || !roadmap) return false;
    
    return [main, participants, roadmap];
}

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight / 4 &&
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const getPage = (location) => {
    const path = location.pathname;
    const page = Object.keys(pagesPaths).find(key => pagesPaths[key] === path);
    if (page) return page;
    return false;
}

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
}

const Sidebar = () => {
    const location = useLocation();

    const page = getPage(location);
    const [projectField, setProjectField] = useState(null);

    useEffect(() => {
        if (page === "main") { // in the future will be project(s)
            const projectFields = getProjectsFieldsRefs();
            setProjectField(getProject(location, projectFields));
            const onScroll = window.addEventListener('scroll', () => setProjectField(getProject(location, projectFields)), true);
            return window.removeEventListener('scroll', onScroll);
        }
    }, []);

    return (
        <aside className={styles.aside}>
            {/* pages + their props */}
            <SidebarButton type="main" active={page === "main"}/>
            <SidebarButton type="projects" active={page === "projects"}/>
            <SidebarProjects projects={[
                {avatar: "", name: "Проект 1", toProject: () => {}, blocks: getProjectsFieldsRefs(), chosen: projectField, placeInProject: null, toPlace: () => {}},
                // {avatar: "", name: "Проект 2", toProject: () => {}, chosen: false, placeInProject: null, toPlace: () => {}},
                // {avatar: "", name: "Проект 3", toProject: () => {}, chosen: false, placeInProject: null, toPlace: () => {}},
                // {avatar: "", name: "Проект 4", toProject: () => {}, chosen: false, placeInProject: null, toPlace: () => {}}
            ]}
            places={placesInProjects}
            />
            <SidebarButton type="settings" active={page === "settings"}/>
        </aside>
    );
}

export default Sidebar;