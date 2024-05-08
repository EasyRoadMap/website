import Base from "./Base.jsx";
import MainInfo from "../compoments/mainInfo/MainInfo.jsx";
import ProjectsList from "../compoments/projectList/ProjectList.jsx";

const Main = () => {
  return (
    <Base>
      <MainInfo />
      <ProjectsList />
    </Base>
  );
};

export default Main;
