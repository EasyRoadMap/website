import style from "./styleUI.module.css";
import AccentColor from "../../../assets/accentColorSVG.jsx";
import { useState } from "react";
import { accentColors } from "../../accent.js";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";

export default function Accent() {
  const [activeAccent, setActiveAccent] = useState(null);
  const { PutAppearance } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();

  const changeColorInAPI = (color_name) => {
    const color_hash = accentColors.find((color) => {return color.name === color_name})?.color;
    if (!color_hash) return;
    const color_obj = {
      r: color_hash[0],
      g: color_hash[1],
      b: color_hash[2],
      a: color_hash[3],
    }

    PutAppearance(workspaceContext.id, workspaceContext.appearance.theme, color_obj);
  }

  const handleColorClick = (color) => {
    if (!workspaceContext?.id || !workspaceContext?.appearance?.theme) return;
    setActiveAccent(color);
    changeColorInAPI(color);
  };
  return (
    <div className={style.accentWrapper}>
      <span className={style.title}>Цветовой акцент</span>
      <span className={style.description}>
        Сайт перекрасится в выбранный Вами цвет.
      </span>
      <div className={style.accent}>
        <div className={style.accentChoice}>
          <AccentColor
            accentColor="red"
            isActive={activeAccent === "red"}
            onClick={() => handleColorClick("red")}
          />
          <AccentColor
            accentColor="orange"
            isActive={activeAccent === "orange"}
            onClick={() => handleColorClick("orange")}
          />
          <AccentColor
            accentColor="yellow"
            isActive={activeAccent === "yellow"}
            onClick={() => handleColorClick("yellow")}
          />
          <AccentColor
            accentColor="green"
            isActive={activeAccent === "green"}
            onClick={() => handleColorClick("green")}
          />
          <AccentColor
            accentColor="lightBlue"
            isActive={activeAccent === "lightBlue"}
            onClick={() => handleColorClick("lightBlue")}
          />
          <AccentColor
            accentColor="blue"
            isActive={activeAccent === "blue"}
            onClick={() => handleColorClick("blue")}
          />
          <AccentColor
            accentColor="pink"
            isActive={activeAccent === "pink"}
            onClick={() => handleColorClick("pink")}
          />
          <AccentColor
            accentColor="purple"
            isActive={activeAccent === "purple"}
            onClick={() => handleColorClick("purple")}
          />
        </div>
      </div>
    </div>
  );
}
