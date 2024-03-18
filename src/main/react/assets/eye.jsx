import * as React from "react";
const eyeSVG = (props) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.5}>
      <path
        d="M3 9.5C6 3.5 12.5 3.5 16 9.5"
        stroke="black"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle cx={9.5} cy={9.5} r={2} fill="black" />
      <path
        d="M3 9.5C6 15.5 12.5 15.5 16 9.5"
        stroke="black"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </g>
  </svg>
);
export default eyeSVG;
