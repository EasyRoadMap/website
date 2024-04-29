import styles from "./style.module.css";
const ClosePopupSVG = (props) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="transparent"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.85}>
      <path
        d="M24.773 15.2271L15.2271 24.773L24.773 15.2271ZM15.2273 15.2271L24.7733 24.7729L15.2273 15.2271Z"
        fill="black"
        className={styles.closePopupSVGFill}
      />
      <path
        d="M24.773 15.2271L15.2271 24.773M15.2273 15.2271L24.7733 24.7729"
        stroke="black"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.closePopupSVGStroke}
      />
    </g>
  </svg>
);
export default ClosePopupSVG;
