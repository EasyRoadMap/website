const AddWorkspaceSVG = (props) => (
  <svg
    width={39}
    height={39}
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={19.5} cy={19.5} r={19} fill="#0066FE" />
    <path d="M19.5 12V27V12ZM12 19.5H27H12Z" fill="black" />
    <path
      d="M19.5 12V27M12 19.5H27"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default AddWorkspaceSVG;
