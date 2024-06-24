import Base from "./Base.jsx";
import MainInfo from "../compoments/mainInfo/MainInfo.jsx";
import ProjectsList from "../compoments/projectList/ProjectList.jsx";
import NoProjectAdmin from "../../workspace/components/projects/NoProjectAdmin.jsx";

import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

const Main = () => {
  const { workspaceContext } = useWorkspaceContext();
  return (
    <Base>
      <MainInfo
        name={workspaceContext?.info?.name}
        description={workspaceContext?.info?.description}
        photo={workspaceContext?.photo}
      />
      {workspaceContext?.projects ? (
        <ProjectsList projects={workspaceContext.projects} />
      ) : (
        <NoProjectAdmin type="public" />
      )}
    </Base>
  );
};

export default Main;
