import styles from "./styles.module.css";

const PopupBase = ({
    isOpen,
    close,
    children
}) => {
    return (
        <div className={styles.blurredScreen} 
             style={isOpen ? {} : {display: 'none'}}>
            <div className={styles.popup}>
                {children}
                <div className={styles.closeButton} onClick={close}>
                    {/* callback closes popup  */}
                    <img src="" alt="x" />
                </div>
            </div>
        </div>
    );
}

export default PopupBase;