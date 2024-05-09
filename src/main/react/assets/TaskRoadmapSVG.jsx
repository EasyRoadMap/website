import styles from "./style.module.css";

const className = {
  done: styles.taskRoadmapDoneSVG,
  progress: styles.taskRoadmapProgressSVG,
  planned: styles.taskRoadmapPlannedSVG,
};

const classNameActive = {
  done: styles.taskRoadmapDoneSVGActive,
  progress: styles.taskRoadmapProgressSVGActive,
  planned: styles.taskRoadmapPlannedSVGActive,
};

const getY = (progress) => {
  return  Math.round((-Math.sin(0.5 * Math.PI - 2 * Math.PI * progress) + 1) * 46);
};
const getX = (progress) => {
  return Math.round(Math.cos(0.5 * Math.PI - 2 * Math.PI * progress) * 46);
};

const TaskRoadmapSVG = (props) => (
  <svg
    width={132}
    height={130}
    viewBox="0 0 132 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={
      props.isActive
        ? [className[props.status], classNameActive[props.status]].join(" ")
        : className[props.status]
    }
    {...props}
  >
    <path
      d="M110.25 56c0 30.238-24.512 54.75-54.75 54.75S.75 86.238.75 56 25.262 1.25 55.5 1.25 110.25 25.762 110.25 56Z"
      stroke="#99E550"
      strokeWidth={0.5}
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M110.25 56c0 30.238-24.512 54.75-54.75 54.75S.75 86.238.75 56 25.262 1.25 55.5 1.25 110.25 25.762 110.25 56Z"
      stroke="#00FF38"
      strokeOpacity={0.2}
      strokeWidth={0.5}
      className={styles.taskRoadmapSVGProgress}
    />
    <path
      d="M110.25 56c0 30.238-24.512 54.75-54.75 54.75S.75 86.238.75 56 25.262 1.25 55.5 1.25 110.25 25.762 110.25 56Z"
      stroke="#000"
      strokeOpacity={0.1}
      strokeWidth={0.5}
    />
    <path
      d="M131.25 79c0 27.476-22.274 49.75-49.75 49.75S31.75 106.476 31.75 79 54.024 29.25 81.5 29.25 131.25 51.524 131.25 79Z"
      stroke="#99E550"
      strokeWidth={0.5}
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M131.25 79c0 27.476-22.274 49.75-49.75 49.75S31.75 106.476 31.75 79 54.024 29.25 81.5 29.25 131.25 51.524 131.25 79Z"
      stroke="#00FF38"
      strokeOpacity={0.2}
      strokeWidth={0.5}
      className={styles.taskRoadmapSVGProgress}
    />
    <path
      d="M131.25 79c0 27.476-22.274 49.75-49.75 49.75S31.75 106.476 31.75 79 54.024 29.25 81.5 29.25 131.25 51.524 131.25 79Z"
      stroke="#000"
      strokeOpacity={0.1}
      strokeWidth={0.5}
    />
    <path
      d="M123 67c0 30.1-24.4 54.5-54.5 54.5S14 97.1 14 67s24.4-54.5 54.5-54.5S123 36.9 123 67Z"
      stroke="#99E550"
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M123 67c0 30.1-24.4 54.5-54.5 54.5S14 97.1 14 67s24.4-54.5 54.5-54.5S123 36.9 123 67Z"
      stroke="#00FF38"
      strokeOpacity={0.2}
      className={styles.taskRoadmapSVGProgress}
    />
    <path
      d="M123 67c0 30.1-24.4 54.5-54.5 54.5S14 97.1 14 67s24.4-54.5 54.5-54.5S123 36.9 123 67Z"
      stroke="#000"
      strokeOpacity={0.1}
    />
    <g
      opacity={0.7}
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeDasharray="3 3"
    >
      <path
        d="M110.5 74c0 30.376-24.624 55-55 55S.5 104.376.5 74s24.624-55 55-55 55 24.624 55 55Z"
        stroke="#99E550"
        className={styles.taskRoadmapSVG}
      />
      <path
        d="M110.5 74c0 30.376-24.624 55-55 55S.5 104.376.5 74s24.624-55 55-55 55 24.624 55 55Z"
        stroke="#00FF38"
        strokeOpacity={0.2}
        className={styles.taskRoadmapSVGProgress}
      />
      <path
        d="M110.5 74c0 30.376-24.624 55-55 55S.5 104.376.5 74s24.624-55 55-55 55 24.624 55 55Z"
        stroke="#000"
        strokeOpacity={0.1}
      />
    </g>
    <g
      opacity={0.7}
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeDasharray="3 3"
    >
      <path
        d="M127.5 51c0 27.614-22.386 50-50 50s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Z"
        stroke="#99E550"
        className={styles.taskRoadmapSVG}
      />
      <path
        d="M127.5 51c0 27.614-22.386 50-50 50s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Z"
        stroke="#00FF38"
        strokeOpacity={0.2}
        className={styles.taskRoadmapSVGProgress}
      />
      <path
        d="M127.5 51c0 27.614-22.386 50-50 50s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Z"
        stroke="#000"
        strokeOpacity={0.1}
      />
    </g>
    <path
      d="M89.5 66.5C89.5 78.374 79.874 88 68 88s-21.5-9.626-21.5-21.5S56.126 45 68 45s21.5 9.626 21.5 21.5Z"
      stroke="#99E550"
      strokeWidth={2}
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M89.5 66.5C89.5 78.374 79.874 88 68 88s-21.5-9.626-21.5-21.5S56.126 45 68 45s21.5 9.626 21.5 21.5Z"
      stroke="#00FF38"
      strokeOpacity={0.2}
      strokeWidth={2}
      className={styles.taskRoadmapSVGProgress}
    />
    <path
      d="M89.5 66.5C89.5 78.374 79.874 88 68 88s-21.5-9.626-21.5-21.5S56.126 45 68 45s21.5 9.626 21.5 21.5Z"
      stroke="#000"
      strokeOpacity={0.1}
      strokeWidth={2}
    />
    <path
      d="M92.5 66.5C92.5 80.031 81.531 91 68 91S43.5 80.031 43.5 66.5 54.469 42 68 42s24.5 10.969 24.5 24.5Z"
      stroke="#99E550"
      strokeWidth={2}
      className={styles.taskRoadmapSVG}
    />
    <path
      d="M92.5 66.5C92.5 80.031 81.531 91 68 91S43.5 80.031 43.5 66.5 54.469 42 68 42s24.5 10.969 24.5 24.5Z"
      stroke="#00FF38"
      strokeOpacity={0.2}
      strokeWidth={2}
      className={styles.taskRoadmapSVGProgress}
    />
    <path
      d="M92.5 66.5C92.5 80.031 81.531 91 68 91S43.5 80.031 43.5 66.5 54.469 42 68 42s24.5 10.969 24.5 24.5Z"
      stroke="#000"
      strokeOpacity={0.1}
      strokeWidth={2}
    />
    <path
      d="M80.5 66.5C80.5 73.404 74.904 79 68 79s-12.5-5.596-12.5-12.5S61.096 54 68 54s12.5 5.596 12.5 12.5"
      fill="#99E550"
      className={styles.taskRoadmapSVGFill}
    />
    <path
      d="M80.5 66.5C80.5 73.404 74.904 79 68 79s-12.5-5.596-12.5-12.5S61.096 54 68 54s12.5 5.596 12.5 12.5"
      fill="#00FF38"
      fillOpacity={0.2}
      className={styles.taskRoadmapSVGProgressFill}
    />
    <path
      d="M80.5 66.5C80.5 73.404 74.904 79 68 79s-12.5-5.596-12.5-12.5S61.096 54 68 54s12.5 5.596 12.5 12.5"
      fill="#000"
      fillOpacity={0.1}
    />
    <path
      d="M79 66.5c0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11 11 4.925 11 11Z"
      stroke="#fff"
      strokeOpacity={0.5}
      strokeWidth={3}
    />
    <g opacity={0.6} strokeWidth={15}>
      <path
        d="M68 104.5c20.987 0 38-17.013 38-38s-17.013-38-38-38-38 17.013-38 38 17.013 38 38 38Z"
        stroke="#99E550"
        className={styles.taskRoadmapSVG}
      />
      <path
        d="M68 104.5c20.987 0 38-17.013 38-38s-17.013-38-38-38-38 17.013-38 38 17.013 38 38 38Z"
        stroke="#00FF38"
        strokeOpacity={0.2}
        className={styles.taskRoadmapSVGProgress}
      />
      <path
        d="M68 104.5c20.987 0 38-17.013 38-38s-17.013-38-38-38-38 17.013-38 38 17.013 38 38 38Z"
        stroke="#000"
        strokeOpacity={0.1}
      />
    </g>
    {
      (props.progress < 1) &&
      <mask
        id={"stage" + props.id}
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={22}
        y={21}
        width={92}
        height={92}
      >
        <path
          d={`M68 21a46 46 0 ${
            props.progress <= 0.5 ? 0 : 1
          } 1 ${getX(props.progress)} ${getY(props.progress)}L68 67Z`}
          fill="#D9D9D9"
        />  
      </mask>
    }
    <g mask={`url(#stage${props.id})`} strokeWidth={15}>
      <path
        d="M68 104.5c20.987 0 38-17.013 38-38s-17.013-38-38-38-38 17.013-38 38 17.013 38 38 38Z"
        stroke="#99E550"
        className={styles.taskRoadmapSVG}
      />
      <path
        d="M68 104.5c20.987 0 38-17.013 38-38s-17.013-38-38-38-38 17.013-38 38 17.013 38 38 38Z"
        stroke="#00FF38"
        strokeOpacity={0.2}
        className={styles.taskRoadmapSVGProgress}
      />
      <path
        d="M68 104.5c20.987 0 38-17.013 38-38s-17.013-38-38-38-38 17.013-38 38 17.013 38 38 38Z"
        stroke="#000"
        strokeOpacity={0.1}
      />
    </g>
  </svg>
);
export default TaskRoadmapSVG;

//   <svg
//     width={132}
//     height={130}
//     viewBox="0 0 132 130"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className={
//       props.isActive
//         ? [className[props.status], classNameActive[props.status]].join(" ")
//         : className[props.status]
//     }
//     {...props}
//   >
//     <path
//       d="M110.25 56C110.25 86.2376 85.7376 110.75 55.5 110.75C25.2624 110.75 0.75 86.2376 0.75 56C0.75 25.7624 25.2624 1.25 55.5 1.25C85.7376 1.25 110.25 25.7624 110.25 56Z"
//       stroke="#99E550"
//       strokeWidth={0.5}
//       className={styles.taskRoadmapSVG}
//     />
//     <path
//       d="M131.25 79C131.25 106.476 108.976 128.75 81.5 128.75C54.0238 128.75 31.75 106.476 31.75 79C31.75 51.5238 54.0238 29.25 81.5 29.25C108.976 29.25 131.25 51.5238 131.25 79Z"
//       stroke="#99E550"
//       strokeWidth={0.5}
//       className={styles.taskRoadmapSVG}
//     />
//     <path
//       d="M123 67C123 97.0995 98.5995 121.5 68.5 121.5C38.4005 121.5 14 97.0995 14 67C14 36.9005 38.4005 12.5 68.5 12.5C98.5995 12.5 123 36.9005 123 67Z"
//       stroke="#99E550"
//       className={styles.taskRoadmapSVG}
//     />
//     <path
//       opacity={0.7}
//       d="M110.5 74C110.5 104.376 85.8757 129 55.5 129C25.1243 129 0.5 104.376 0.5 74C0.5 43.6243 25.1243 19 55.5 19C85.8757 19 110.5 43.6243 110.5 74Z"
//       stroke="#99E550"
//       strokeWidth={0.5}
//       strokeLinecap="round"
//       strokeDasharray="3 3"
//       className={styles.taskRoadmapSVG}
//     />
//     <path
//       opacity={0.7}
//       d="M127.5 51C127.5 78.6142 105.114 101 77.5 101C49.8858 101 27.5 78.6142 27.5 51C27.5 23.3858 49.8858 1 77.5 1C105.114 1 127.5 23.3858 127.5 51Z"
//       stroke="#99E550"
//       strokeWidth={0.5}
//       strokeLinecap="round"
//       strokeDasharray="3 3"
//       className={styles.taskRoadmapSVG}
//     />
//     <path
//       d="M89.5 66.5C89.5 78.3741 79.8741 88 68 88C56.1259 88 46.5 78.3741 46.5 66.5C46.5 54.6259 56.1259 45 68 45C79.8741 45 89.5 54.6259 89.5 66.5Z"
//       stroke="#99E550"
//       strokeWidth={2}
//       className={styles.taskRoadmapSVG}
//     />
//     <path
//       d="M92.5 66.5C92.5 80.031 81.531 91 68 91C54.469 91 43.5 80.031 43.5 66.5C43.5 52.969 54.469 42 68 42C81.531 42 92.5 52.969 92.5 66.5Z"
//       stroke="#99E550"
//       strokeWidth={2}
//       className={styles.taskRoadmapSVG}
//     />
//     <path
//       d="M80.5 66.5C80.5 73.4036 74.9036 79 68 79C61.0964 79 55.5 73.4036 55.5 66.5C55.5 59.5964 61.0964 54 68 54C74.9036 54 80.5 59.5964 80.5 66.5Z"
//       fill="#99E550"
//       className={styles.taskRoadmapSVGFill}
//     />
//     <path
//       d="M79 66.5C79 72.5751 74.0751 77.5 68 77.5C61.9249 77.5 57 72.5751 57 66.5C57 60.4249 61.9249 55.5 68 55.5C74.0751 55.5 79 60.4249 79 66.5Z"
//       stroke="white"
//       strokeOpacity={0.5}
//       strokeWidth={3}
//     />
//     <mask
//       id="a"
//       style="mask-type:alpha"
//       maskUnits="userSpaceOnUse"
//       x="22"
//       y="21"
//       width="92"
//       height="92"
//     >
//       <path d="M68 21a46 46 0 1 1-46 46h46Z" fill="#D9D9D9" />
//     </mask>
//     <g mask="url(#a)">
//       <path
//         d="M68 100C86.5015 100 101.5 85.0015 101.5 66.5C101.5 47.9985 86.5015 33 68 33C49.4985 33 34.5 47.9985 34.5 66.5C34.5 85.0015 49.4985 100 68 100Z"
//         stroke="#99E550"
//         strokeWidth={12}
//         className={styles.taskRoadmapSVGOutside}
//       />
//     </g>
//   </svg>
