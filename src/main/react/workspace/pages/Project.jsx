import Base from "./Base.jsx";
import ProjectMainInfo from "../components/ProjectMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";
import Roadmap from "../components/roadmap/Roadmap.jsx";
import DeleteBlock from "../components/deleteBlock/DeleteBlock.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
import { useProjectInfo } from "../hooks/useProject.jsx";
import { useEffect, useState } from "react";

const Project = () => {
  const { projectContext } = useProjectContext();
  const { Project, Members } = useProjectInfo();

  useEffect(() => {
    Project()
  }, []);

  useEffect(() => {
    console.log("useeffect");
    console.log(projectContext);
    if (!projectContext?.id) return;
    Members(projectContext.id);
  }, [projectContext.id]);

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
