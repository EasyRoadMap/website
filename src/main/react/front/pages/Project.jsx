import Base from "./Base.jsx";
import ProjectInfo from "../compoments/mainInfo/ProjectInfo.jsx";
import useProjectContext from "../hooks/useProjectContext.js";
import Roadmap from "../compoments/roadmap/Roadmap.jsx";
import { TasksProvider } from "../context/TasksContextProvider.js";
import { useParams } from "react-router-dom";

const Project = () => {
  const { projectContext } = useProjectContext();
  const params = useParams();

  return (
    <div key={params.pr_id}>
    <Base>
      <ProjectInfo 
        name={projectContext?.info?.name}
        description={projectContext?.info?.description}
        links={projectContext?.links}
        photo={projectContext?.photo}
      />
      <TasksProvider>
        <Roadmap
          pr_id={projectContext?.id}
          stages={projectContext?.stages}
        />
      </TasksProvider>
    </Base>
    </div>
  );
};

export default Project;
