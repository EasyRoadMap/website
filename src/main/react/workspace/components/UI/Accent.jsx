import style from "./styleUI.module.css";
import AccentColor from "../../../assets/accentColorSVG.jsx";
import { useEffect, useState } from "react";
import { accentColors } from "../../accent.js";
import { useWorkspaceInfo } from "../../hooks/useWorkspace.jsx";
import useWorkspaceContext from "../../hooks/useWorkspaceContext.js";
import { IntToRGBA } from "../../utils/RGBAToIntConverter.js";


const findColorNameByInt = (num) => {
  console.debug('num', num);
  const rgbaWSColor = IntToRGBA(num);
  if (rgbaWSColor.a > 1) rgbaWSColor.a /= 255; 
  const accentColorObj = accentColors.find((colorObj) => {
    return colorObj.color[0] === rgbaWSColor.r &&
           colorObj.color[1] === rgbaWSColor.g &&
           colorObj.color[2] === rgbaWSColor.b &&
           colorObj.color[3] === rgbaWSColor.a
  });
  console.debug("accc", accentColorObj, rgbaWSColor, accentColors);
  if (!accentColorObj) return;
  return accentColorObj.name;
}

export default function Accent({
  accent
}) {
  const [activeAccent, setActiveAccent] = useState(findColorNameByInt(accent));
  const { PutAppearance } = useWorkspaceInfo();
  const { workspaceContext } = useWorkspaceContext();

  useEffect(() => {
    if (workspaceContext?.appearance?.accent_color && activeAccent === null) {
      const rgbaWSColor = IntToRGBA(workspaceContext.appearance.accent_color);
      const accentColorObj = accentColors.find((colorObj) => {
        return colorObj.color[0] === rgbaWSColor.r &&
               colorObj.color[1] === rgbaWSColor.g &&
               colorObj.color[2] === rgbaWSColor.b &&
               colorObj.color[3] === rgbaWSColor.a
      });
      if (!accentColorObj) return;
      setActiveAccent(accentColorObj.name);
    }
  }, [workspaceContext.appearance]);

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
