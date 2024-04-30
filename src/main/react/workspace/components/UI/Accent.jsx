import style from "./styleUI.module.css";
import AccentColor from "../../../assets/accentColorSVG.jsx";
import { useState } from "react";

export default function Accent() {
  const [activeAccent, setActiveAccent] = useState(null);

  const handleColorClick = (color) => {
    setActiveAccent(color);
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
