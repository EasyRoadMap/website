const Triangle = (props) => (
  <svg
    width={10}
    height={7}
    viewBox="0 0 10 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 7L4.18627 1.13923C4.58509 0.580878 5.41491 0.580878 5.81373 1.13923L10 7H0Z"
      fill={props.color}
      fillOpacity={props.opacity ? props.opacity : 0.15}
    />
  </svg>
);
export default Triangle;
