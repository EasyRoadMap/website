import styles from "../assets/style.module.css";
const CalendarPageVisitor = (props) => (
  <svg
    width={15}
    height={16}
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.875 1.25H11.25V0.625C11.25 0.28 10.9706 0 10.625 0C10.2794 0 10 0.28 10 0.625V1.25H5V0.625C5 0.28 4.72062 0 4.375 0C4.02938 0 3.75 0.28 3.75 0.625V1.25H3.125C1.40188 1.25 0 2.65188 0 4.375V12.8752C0 14.5984 1.40188 16.0002 3.125 16.0002H11.875C13.5981 16.0002 15 14.5984 15 12.8752V4.375C15 2.65188 13.5981 1.25 11.875 1.25ZM3.125 2.5H11.875C12.9088 2.5 13.75 3.34125 13.75 4.375V5H1.25V4.375C1.25 3.34125 2.09125 2.5 3.125 2.5ZM11.875 14.7502H3.125C2.09125 14.7502 1.25 13.909 1.25 12.8752V6.25H13.75V12.8752C13.75 13.909 12.9088 14.7502 11.875 14.7502ZM11.145 8.22C11.385 8.46813 11.3775 8.86438 11.1294 9.10375L8.16687 11.9588C7.82125 12.3044 7.35 12.5 6.84937 12.5C6.34875 12.5 5.8775 12.305 5.52375 11.9506L4.11625 10.6431C3.86375 10.4081 3.84875 10.0125 4.08375 9.76C4.32 9.50688 4.715 9.49312 4.96688 9.7275L6.39062 11.0506C6.66125 11.3194 7.055 11.3019 7.29 11.0669L10.2612 8.20312C10.51 7.96375 10.905 7.97188 11.145 8.22Z"
      fill="black"
      className={styles.calendarVisitorSVG}
    />
  </svg>
);
export default CalendarPageVisitor;
