import styles from "./style.module.css";
const MoveRoadMap = (props) => (
  <svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.roadMapMoveIcon}
    {...props}
  >
    <g opacity={0.5}>
      <rect width={64} height={64} rx={15} fill="black" fillOpacity={0.05} />
      <path
        d="M33.3333 24L41.3333 32L33.3333 40M24 24L32 32L24 40"
        stroke="black"
        strokeOpacity={0.15}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
export default MoveRoadMap;
