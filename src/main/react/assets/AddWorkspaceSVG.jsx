const AddWorkspaceSVG = (props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={16} cy={16} r={16} fill="#0066FE" />
    <path d="M16 8V24V8ZM8 16H24H8Z" fill="black" />
    <path
      d="M16 8V24M8 16H24"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default AddWorkspaceSVG;
