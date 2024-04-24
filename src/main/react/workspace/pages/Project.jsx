import Base from "./Base.jsx";
import ProjectMainInfo from "../components/ProjectMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";
import Roadmap from "../components/roadmap/Roadmap.jsx";
import DeleteBlock from "../components/deleteBlock/DeleteBlock.jsx";

const Project = () => {
  return (
    <Base>
      <ProjectMainInfo />
      <Participants />
      <Roadmap />
      <DeleteBlock typeButton="deleteProject" />
    </Base>
  );
};

export default Project;
