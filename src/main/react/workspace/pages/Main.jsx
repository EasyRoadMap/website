import Base from "./Base.jsx";
import WorkspaceMainInfo from "../components/WorkspaceMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";
import useWorkspaceContext from "../hooks/useWorkspaceContext.js";

const Main = () => {
  const { workspaceContext } = useWorkspaceContext();
  return (
    <Base>
      <WorkspaceMainInfo logo={workspaceContext?.photo} initialValues={{
        name: workspaceContext?.info?.name,
        description: workspaceContext?.info?.description,
        waitUntilLoadName: workspaceContext?.info?.name === null,
        waitUntilLoadDescription: workspaceContext?.info?.description === null
      }}
      />
      <Participants participants={workspaceContext?.users} type={"workspace"}/>
    </Base>
  );
};

export default Main;
