const deleteTaskRoadmapSVG = (props) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={0.5}
      width={20}
      height={20}
      rx={10}
      fill="black"
      fillOpacity={0.05}
    />
    <g opacity={0.85}>
      <path
        d="M13.1517 7.34817L7.84839 12.6515M7.8485 7.34814L13.1518 12.6514"
        stroke="black"
        strokeOpacity={0.85}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
export default deleteTaskRoadmapSVG;
