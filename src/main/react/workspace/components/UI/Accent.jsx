import style from "./styleUI.module.css";
import AccentRedSVG from "../../../assets/AccentRedSVG.jsx";
import AccentOrangeSVG from "../../../assets/AccentOrangeSVG.jsx";
import AccentYellowSVG from "../../../assets/AccentYellowSVG.jsx";
import AccentGreenSVG from "../../../assets/AccentGreenSVG.jsx";
import AccentLightBlueSVG from "../../../assets/AccentLightBlueSVG.jsx";
import AccentBlueActiveSVG from "../../../assets/AccentBlueActiveSVG.jsx";
import AccentPinkSVG from "../../../assets/AccentPinkSVG.jsx";
import AccentPurpleSVG from "../../../assets/AccentPurpleSVG.jsx";
import AccentBlueSVG from "../../../assets/AccentBlueSVG.jsx";
import AccentRedActiveSVG from "../../../assets/AccentRedActiveSVG.jsx";
import AccentOrangeActiveSVG from "../../../assets/AccentOrangeActiveSVG.jsx";
import AccentYellowActiveSVG from "../../../assets/AccentYellowActiveSVG.jsx";
import AccentGreenActiveSVG from "../../../assets/AccentGreenActiveSVG.jsx";
import AccentLightBlueActiveSVG from "../../../assets/AccentLightBlueActiveSVG.jsx";
import AccentPinkActiveSVG from "../../../assets/AccentPinkActiveSVG.jsx";
import AccentPurpleActiveSVG from "../../../assets/AccentPurpleActiveSVG.jsx";

export default function Accent() {
  return (
    <div className={style.accentWrapper}>
      <span className={style.title}>Цветовой акцент</span>
      <span className={style.description}>
        Сайт перекрасится в выбранный Вами цвет.
      </span>
      <div className={style.accent}>
        <div className={style.accentChoice}>
          <AccentRedSVG />
          <AccentOrangeSVG />
          <AccentYellowSVG />
          <AccentGreenSVG />
          <AccentLightBlueSVG />
          <AccentBlueSVG />
          <AccentPinkSVG />
          <AccentPurpleSVG />
        </div>
      </div>
    </div>
  );
}
