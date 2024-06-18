import styles from "./style.module.css";
const CloseTaskDescriptionSVG = (props) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.85}>
      <path
        d="M13.7725 4.2271L4.22656 13.773L13.7725 4.2271ZM4.22677 4.22705L13.7728 13.7729L4.22677 4.22705Z"
        fill="black"
        fillOpacity={0.5}
        className={styles.clsFill}
      />
      <path
        d="M13.7725 4.2271L4.22656 13.773M4.22677 4.22705L13.7728 13.7729"
        stroke="black"
        strokeOpacity={0.5}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.clsStroke}
      />
    </g>
  </svg>
);
export default CloseTaskDescriptionSVG;
