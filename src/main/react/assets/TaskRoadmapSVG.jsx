import styles from "./style.module.css";

const className = {
  "done": styles.taskRoadmapDoneSVG,
  "progress": styles.taskRoadmapProgressSVG,
  "planned": styles.taskRoadmapPlannedSVG,
}

const classNameActive = {
  "done": styles.taskRoadmapDoneSVGActive,
  "progress": styles.taskRoadmapProgressSVGActive,
  "planned": styles.taskRoadmapPlannedSVGActive,
}

const TaskRoadmapSVG = (props) => (
  <svg
    width={132}
    height={130}
    viewBox="0 0 132 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.isActive ? [className[props.status], classNameActive[props.status]].join(" ") : className[props.status]}
    {...props}
  >
    <path
      d="M110.25 56C110.25 86.2376 85.7376 110.75 55.5 110.75C25.2624 110.75 0.75 86.2376 0.75 56C0.75 25.7624 25.2624 1.25 55.5 1.25C85.7376 1.25 110.25 25.7624 110.25 56Z"
      stroke="#99E550"
      strokeWidth={0.5}
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M131.25 79C131.25 106.476 108.976 128.75 81.5 128.75C54.0238 128.75 31.75 106.476 31.75 79C31.75 51.5238 54.0238 29.25 81.5 29.25C108.976 29.25 131.25 51.5238 131.25 79Z"
      stroke="#99E550"
      strokeWidth={0.5}
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M123 67C123 97.0995 98.5995 121.5 68.5 121.5C38.4005 121.5 14 97.0995 14 67C14 36.9005 38.4005 12.5 68.5 12.5C98.5995 12.5 123 36.9005 123 67Z"
      stroke="#99E550"
      className={styles.taskRoadmapSVG}
    />
    <path
      opacity={0.7}
      d="M110.5 74C110.5 104.376 85.8757 129 55.5 129C25.1243 129 0.5 104.376 0.5 74C0.5 43.6243 25.1243 19 55.5 19C85.8757 19 110.5 43.6243 110.5 74Z"
      stroke="#99E550"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeDasharray="3 3"
      className={styles.taskRoadmapSVG}
    />
    <path
      opacity={0.7}
      d="M127.5 51C127.5 78.6142 105.114 101 77.5 101C49.8858 101 27.5 78.6142 27.5 51C27.5 23.3858 49.8858 1 77.5 1C105.114 1 127.5 23.3858 127.5 51Z"
      stroke="#99E550"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeDasharray="3 3"
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M89.5 66.5C89.5 78.3741 79.8741 88 68 88C56.1259 88 46.5 78.3741 46.5 66.5C46.5 54.6259 56.1259 45 68 45C79.8741 45 89.5 54.6259 89.5 66.5Z"
      stroke="#99E550"
      strokeWidth={2}
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M92.5 66.5C92.5 80.031 81.531 91 68 91C54.469 91 43.5 80.031 43.5 66.5C43.5 52.969 54.469 42 68 42C81.531 42 92.5 52.969 92.5 66.5Z"
      stroke="#99E550"
      strokeWidth={2}
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M80.5 66.5C80.5 73.4036 74.9036 79 68 79C61.0964 79 55.5 73.4036 55.5 66.5C55.5 59.5964 61.0964 54 68 54C74.9036 54 80.5 59.5964 80.5 66.5Z"
      fill="#99E550"
      className={styles.taskRoadmapSVGFill}
    />
    <path
      d="M79 66.5C79 72.5751 74.0751 77.5 68 77.5C61.9249 77.5 57 72.5751 57 66.5C57 60.4249 61.9249 55.5 68 55.5C74.0751 55.5 79 60.4249 79 66.5Z"
      stroke="white"
      strokeOpacity={0.5}
      strokeWidth={3}
    />
    <path
      d="M68 100C86.5015 100 101.5 85.0015 101.5 66.5C101.5 47.9985 86.5015 33 68 33C49.4985 33 34.5 47.9985 34.5 66.5C34.5 85.0015 49.4985 100 68 100Z"
      stroke="#99E550"
      strokeWidth={12}
      className={styles.taskRoadmapSVG}
    />
  </svg>
);
export default TaskRoadmapSVG;
