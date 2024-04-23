import styles from "./dropdownList.module.css";
import TransferSVG from "../../../assets/transferSVG.jsx";
import EditSVG from "../../../assets/editSVG.jsx";
import DeleteSVG from "../../../assets/deleteSVG.jsx";

const DropdownActionsList = ({ buttons, ...props }) => {
  const listOfElems = buttons.map((button, i) => {
    const IconComponent = button.icon;
    return (
      <button className={styles.elem} key={i} onClick={button.callback}>
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
