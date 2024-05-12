import { getProject } from "../api/project-api/getProject.js";
import { deleteProject } from "../api/project-api/deleteProject.js";
import { createProject } from "../api/project-api/createProject.js";
import { useState, useEffect } from "react";
import useProjectContext from "./useProjectContext.js";
import { useWorkspaceInfo } from "./useWorkspace.jsx";
import { getMembers } from "../api/project-api/getMembers.js";
import { updateInfo } from "../api/project-api/updateInfo.js";
import { updateLinks } from "../api/project-api/updateLinks.js";
import { getInfo } from "../api/project-api/getInfo.js";
import { getLinks } from "../api/project-api/getLinks.js";
import { removeMember } from "../api/project-api/removeMember.js";
import { addMember } from "../api/project-api/addMember.js";

export const useProjectInfo = () => {
    const [project, setProject] = useState({});
    const { projectContext, setProjectContext, setProjectId } = useProjectContext();

    const { Projects } = useWorkspaceInfo();

    useEffect(() => {
        if (project?.id) {
            setProjectId(project.id);
        }
        setProjectContext((prev) => ({...prev, ...project}));
    }, [project]);

    const Project = (pr_id) => {
        getProject(pr_id).then((response) => {
            setProject((prev) => ({...prev, ...response.data}));
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    }

    const DeleteProject = (ws_id, pr_id, password, callback) => {
        deleteProject(pr_id, password).then((response) => {
            console.log("deleting Project");
            Projects(ws_id);
            if (callback) callback();
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    }

    const CreateProject = (ws_id, name, description, deadlineAt, callback) => {
        createProject(ws_id, name, description, deadlineAt).then((response) => {
            setProject((prev) => ({...prev, ...response.data}));
            Projects(ws_id);
            if (callback) callback(response.data);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    }

    const Members = (pr_id) => {
        getMembers(pr_id).then((response) => {
            console.log("response Project");
            console.log(response);
            setProject((prev) => ({...prev, users: response.data}));
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    } 

    const KickMember = (pr_id, email) => {
        removeMember(pr_id, email).then((response) => {
            Members(pr_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const AddMember = (pr_id, email, role) => {
        addMember(pr_id, email, role).then((response) => {
            Members(pr_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        })
    }

    const Info = (pr_id) => {
        getInfo(pr_id).then((response) => {
            setProject((prev) => ({...prev, info: response.data}));
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    }

    const Links = (pr_id) => {
        getLinks(pr_id).then((response) => {
            setProject((prev) => ({...prev, links: response.data}));
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    }

    const UpdateInfo = (pr_id, name, description, deadline_at) => {
        updateInfo(pr_id, name, description, deadline_at).then((response) => {
            Info(pr_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    }

    const UpdateLinks = (pr_id, names_array, urls_array) => {
        updateLinks(pr_id, names_array, urls_array).then((response) => {
            Links(pr_id);
        }).catch((e) => {
            console.log("response error");
            console.log(e);
        });
    }


    return { Project, DeleteProject, KickMember, AddMember, CreateProject, Members, UpdateInfo, UpdateLinks };
}