import styles from "./dropdownList.module.css";

const DropdownActionsList = ({ buttons, ...props }) => {
  const listOfElems = buttons.map((button, i) => {
    if (!button) return;
    const IconComponent = button.icon;
    return (
      <button className={styles.elem} key={i} onClick={() => {
        button.callback();
        props.close();
      }}>
        <IconComponent />
        <span className={styles.elemText}>{button.text}</span>
      </button>
    );
  });
  return (
    <div className={styles.dropdownList} style={props?.style}>
      {listOfElems}
    </div>
  );
};

export default DropdownActionsList;
