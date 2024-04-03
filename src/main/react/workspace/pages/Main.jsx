import Base from "./Base.jsx";
import WorkspaceMainInfo from "../components/WorkspaceMainInfo.jsx";
import Participants from "../components/participants/Participants.jsx";

const Main = () => {
  return (
    <Base>
      <WorkspaceMainInfo />
      <Participants />
    </Base>
  );
};

export default Main;
