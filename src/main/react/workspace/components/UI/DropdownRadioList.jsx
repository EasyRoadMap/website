import styles from "./dropdownList.module.css";

const DropdownRadioList = ({
    elems
}) => {
    const listOfElems = elems.map((elem, i) => {
        return (
            <button className={styles.elem} key={i} onClick={elem.callback}>
                <span className={styles.elemText}>
                    {elem.text}
                </span>
                {elem.choosed && <img src="" alt=""></img>} {/* Иконка галочки */}
            </button>
        );
    });
    return (
        <div className={styles.dropdownList}>
            {listOfElems}
        </div>
    );
}

export default DropdownRadioList;