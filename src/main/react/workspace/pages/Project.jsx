import Base from "./Base.jsx";
import ProjectMainInfo from "../components/ProjectMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";
import Roadmap from "../components/roadmap/Roadmap.jsx";
import DeleteBlock from "../components/deleteBlock/DeleteBlock.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
import { useProjectInfo } from "../hooks/useProject.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";

const Project = () => {
  const { projectContext } = useProjectContext();
  const { Project, Members } = useProjectInfo();

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
      <DeleteBlock typeButton="deleteProject" />
    </Base>
  );
};

export default Project;
