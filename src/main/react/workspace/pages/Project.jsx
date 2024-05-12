import Base from "./Base.jsx";
import ProjectMainInfo from "../components/ProjectMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";
import Roadmap from "../components/roadmap/Roadmap.jsx";
import LinkVisitorPage from "../components/linkVisitorPage/linkVisitorPage.jsx";
import DeleteBlock from "../components/deleteBlock/DeleteBlock.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";
import { useRoadmapInfo } from "../hooks/useRoadmap.js";
import { useProjectInfo } from "../hooks/useProject.jsx";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

import { usePopupManager } from "react-popup-manager";
import Popup from "../components/popup/Popup.jsx";
import DeleteProjectPopup from "../components/popup/DeleteProjectPopup.jsx";

import { initProject } from "../hooks/InitProject.js";

const Project = () => {
  const { projectContext, setProjectContext } = useProjectContext();
  const { workspaceContext } = useWorkspaceContext();
  const { Project, Members, DeleteProject } = useProjectInfo();
  const { getStages } = useRoadmapInfo();
  const [projectID, setProjectID] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();

  const popupManager = usePopupManager();

  const getWS = () => {
    const searchParam = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (Object.keys(searchParam).length > 0)
      return "?ws_id=" + searchParam.ws_id;
    return "";
  };

  const onCloseDeleteProjectPopup = (...params) => {
    console.log(params?.[0]);
    if (
      params?.[0]?.button === "delete" &&
      workspaceContext?.id &&
      projectContext?.id
    ) {
      DeleteProject(
        workspaceContext?.id,
        projectContext?.id,
        params?.[0].password,
        () => navigate("/workspace/projects" + getWS())
      );
    }
  };

  const openDeleteProjectPopup = () => {
    popupManager.open(Popup, {
      popup: {
        component: DeleteProjectPopup,
        props: {
          project: projectContext?.info?.name,
        },
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

    setProjectID(state.pr_id);
    setProjectContext(state.pr_id);
    initProject(Project, Members, getStages, state.pr_id);
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
    return qs.parse(location.search, { ignoreQueryPrefix: true });
  };

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
  };

  if (projectContext?.info?.name && state?.pr_id) {
    return (
      <Base>
        <ProjectMainInfo
          initialValues={{
            name: projectContext?.info?.name,
            description: projectContext?.info?.description,
            links: getFulledLinksArray(),
            date: projectContext?.info?.deadline_at
              ? projectContext?.info?.deadline_at
              : "",
          }}
          projectId={projectID}
        />
        <LinkVisitorPage />
        <Participants participants={projectContext?.users} type="project" />
        <Roadmap pr_id={projectID} />
        <DeleteBlock
          typeButton="deleteProject"
          callback={openDeleteProjectPopup}
        />
      </Base>
    );
  }
};

export default Project;
