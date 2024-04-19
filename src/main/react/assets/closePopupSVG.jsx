import styles from "./style.module.css";
const ClosePopupSVG = (props) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.closepopupsvg}
    {...props}
  >
    <path
      d="M10.7729 1.22713L1.22693 10.7731L10.7729 1.22713ZM1.22713 1.22708L10.7732 10.7729L1.22713 1.22708Z"
      fill="black"
    />
    <path
      d="M10.7729 1.22713L1.22693 10.7731M1.22713 1.22708L10.7732 10.7729"
      stroke="black"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ClosePopupSVG;
