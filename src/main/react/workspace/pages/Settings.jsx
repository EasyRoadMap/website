import Base from "./Base.jsx";
import Accent from "../components/UI/Accent.jsx";
import ThemeChange from "../components/UI/ThemeChange.jsx";
import DeleteBlock from "../components/deleteBlock/DeleteBlock.jsx";

const Settings = () => {
  return (
    <Base>
      <ThemeChange />
      <Accent />
      <DeleteBlock typeButton="deleteWorkspace" />
    </Base>
  );
};

export default Settings;
