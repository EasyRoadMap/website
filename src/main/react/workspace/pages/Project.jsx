import Base from "./Base.jsx";
import ProjectMainInfo from "../components/ProjectMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";
import Roadmap from "../components/roadmap/Roadmap.jsx";
import DeleteBlock from "../components/deleteBlock/DeleteBlock.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";
import { useRoadmapInfo } from "../hooks/useRoadmap.js";
import { useProjectInfo } from "../hooks/useProject.jsx";
import { useEffect, useState, useReducer } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";

import { usePopupManager } from "react-popup-manager";
import Popup from "../components/popup/Popup.jsx";
import DeleteProjectPopup from "../components/popup/DeleteProjectPopup.jsx";

import { RoadmapProvider } from "../context/RoadmapContextProvider.js";
import { initProject } from "../hooks/InitProject.js";

const Project = () => {
  const { projectContext } = useProjectContext();
  const { workspaceContext } = useWorkspaceContext();
  const { Project, Members, DeleteProject } = useProjectInfo();
  const { getStages } = useRoadmapInfo();
  const [projectID, setProjectID] = useState(0);
  const location = useLocation();
  const { state } = useLocation();

  const popupManager = usePopupManager();

  const onCloseDeleteProjectPopup = (...params) => {
    console.log(params?.[0]);
    if (params?.[0]?.button === "delete" && workspaceContext?.id && projectContext?.id) {
      DeleteProject(workspaceContext?.id, projectContext?.id, params?.[0].password);
    }
  }

  const openDeleteProjectPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: DeleteProjectPopup,
        props: {
          project: projectContext?.info?.name,
        }
      },
      onClose: onCloseDeleteProjectPopup,
    });
  };

  useEffect(() => {
    console.debug("projectContext has been updated");
  }, [projectContext]);

  useEffect(() => {
    // if (!location?.state?.pr_id) return; 
    console.debug("state has been updated");
    if (!state?.pr_id) return; 

    setProjectID(state?.pr_id);
    // initProject(Project, Members, getStages, location.state.pr_id);
    initProject(Project, Members, getStages, state?.pr_id);

  }, [state]);

  useEffect(() => {
    // if (location?.state?.pr_id) return;
    if (state?.pr_id) return;

    const searchParams = getProjectFromURL();
    if (Object.keys(searchParams).includes("pr_id")) {
      const pr_id = searchParams.pr_id;
      initProject(Project, Members, getStages, pr_id);
    }
  }, []);

  const getProjectFromURL = () => {
    return qs.parse(location.search, { ignoreQueryPrefix: true })
  }

  const getFulledLinksArray = () => { 
    if (!projectContext?.links) return [null, null, null];
    if (projectContext?.links.length < 3) {
      const fulledArray = [null, null, null];
      projectContext.links.forEach((element, i) => {
        fulledArray[i] = projectContext.links[i];
      });
      return fulledArray;
    }
    return projectContext.links;
  }

  if (projectContext?.info?.name && state?.pr_id) {
    return (
      <Base>
          <ProjectMainInfo 
            initialValues={{
              name: projectContext?.info?.name,
              description: projectContext?.info?.description,
              links: getFulledLinksArray(),
              date: projectContext?.info?.deadline_at ? projectContext?.info?.deadline_at : ""
            }}
            projectId={projectID}
          />
          <Participants participants={projectContext?.users} type="project" />
          <Roadmap pr_id={projectID}/>
          <DeleteBlock typeButton="deleteProject" callback={openDeleteProjectPopup} />
      </Base>
    );
  }
};

export default Project;
