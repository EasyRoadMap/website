import styles from "./style.module.css";
const ProjectSVG = (props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.11111 12.6667V23.2222C7.11111 24.1427 7.8573 24.8889 8.77778 24.8889H19.3333V12.6667H7.11111ZM7.11111 11.5556H24.8889V8.77778C24.8889 7.8573 24.1427 7.11111 23.2222 7.11111H8.77778C7.8573 7.11111 7.11111 7.8573 7.11111 8.77778V11.5556ZM24.8889 12.6667H20.4444V24.8889H23.2222C24.1427 24.8889 24.8889 24.1427 24.8889 23.2222V12.6667ZM26 8.77778V23.2222C26 24.7563 24.7563 26 23.2222 26H8.77778C7.24365 26 6 24.7563 6 23.2222V8.77778C6 7.24365 7.24365 6 8.77778 6H23.2222C24.7563 6 26 7.24365 26 8.77778Z"
      fill="#0066FE"
      stroke="#0066FE"
      strokeWidth={0.5}
      className={styles.projectsvg}
    />
  </svg>
);
export default ProjectSVG;
