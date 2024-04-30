import styles from "./style.module.css";
const StageAccentColor = {
  red: styles.red,
  orange: styles.orange,
  yellow: styles.yellow,
  green: styles.green,
  lightBlue: styles.lightBlue,
  blue: styles.blue,
  pink: styles.pink,
  purple: styles.purple,
};
const AccentColorActive = {
  red: styles.redActive,
  orange: styles.orangeActive,
  yellow: styles.yellowActive,
  green: styles.greenActive,
  lightBlue: styles.lightBlueActive,
  blue: styles.blueActive,
  pink: styles.pinkActive,
  purple: styles.purpleActive,
};
const AccentColor = (props) => {
  return (
    <svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        props.isActive
          ? [
              StageAccentColor[props.accentColor],
              AccentColorActive[props.accentColor],
            ].join(" ")
          : StageAccentColor[props.accentColor]
      }
      {...props}
    >
      <rect
        width={60}
        height={60}
        rx={15}
        fill="#FACF36"
        className={styles.accentFill}
      />
      <rect
        x={16.8}
        y={16.8}
        width={26.4}
        height={26.4}
        rx={10}
        fill="black"
        className={styles.accentFillIn}
      />
      <rect
        x={5}
        y={5}
        width={50}
        height={50}
        rx={10}
        fill="#FACF36"
        className={styles.accentFillCheck}
      />
      <path
        d="M40.5 23L27.4999 37.5L20 28.9286"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.accentFillCheckStroke}
      />
      <rect
        x={6.5}
        y={6.5}
        width={47}
        height={47}
        rx={8.5}
        stroke="white"
        strokeWidth={3}
        className={styles.accentFillCheckStroke}
      />
    </svg>
  );
};
export default AccentColor;
