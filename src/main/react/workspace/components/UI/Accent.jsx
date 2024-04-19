import style from "./styleUI.module.css";

export default function Accent() {
  return (
    <div className={style.accentWrapper}>
      <span className={style.title}>Цветовой акцент</span>
      <span className={style.description}>
        Сайт перекрасится в выбранный Вами цвет.
      </span>
      <div className={style.accent}>
        <div></div>
      </div>
    </div>
  );
}
