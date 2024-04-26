import Base from "./Base.jsx";
import ProjectMainInfo from "../components/ProjectMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";
import Roadmap from "../components/roadmap/Roadmap.jsx";
import DeleteBlock from "../components/deleteBlock/DeleteBlock.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";
import { useProjectInfo } from "../hooks/useProject.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";

import { usePopupManager } from "react-popup-manager";
import Popup from "../components/popup/Popup.jsx";
import DeleteProjectPopup from "../components/popup/DeleteProjectPopup.jsx";


const Project = () => {
  const { projectContext } = useProjectContext();
  const { workspaceContext } = useWorkspaceContext();
  const { Project, Members, DeleteProject } = useProjectInfo();

  const popupManager = usePopupManager();

  const onCloseDeleteProjectPopup = (...params) => {
    console.log(params?.[0]);
    if (params?.[0]?.button === "delete" && workspaceContext?.id && projectContext?.id) {
      DeleteProject(workspaceContext?.id, projectContext?.id, params?.[0].password);
    }
  }

  const openDeleteProjectPopup = () => {
    console.log("PRG");
    console.log(projectContext);
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
    const searchParams = getProjectFromURL();
    if (Object.keys(searchParams).includes("pr_id")) {
      const pr_id = searchParams.pr_id;
      Project(pr_id);
      Members(pr_id);
      return;
    }
  }, []);

  const getProjectFromURL = () => {
    return qs.parse(location.search, { ignoreQueryPrefix: true })
  }

  return (
    <Base>
      <ProjectMainInfo />
      <Participants participants={projectContext?.users} type="project" />
      <Roadmap />
      <DeleteBlock typeButton="deleteProject" callback={openDeleteProjectPopup} />
    </Base>
  );
};

export default Project;
