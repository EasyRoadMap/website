// import styles from "./styles.module.css";
// import ClosePopupSVG from "../../../assets/closePopupSVG.jsx";

// const PopupBase = ({ isOpen, close, children }) => {
//   return (
//     <div
//       className={styles.blurredScreen}
//       style={isOpen ? {} : { display: "none" }}
//     >
//       <div
//         className={styles.popup}
//         style={{ maxHeight: "100%", overflowY: "auto" }}
//       >
//         {children}
//         <div className={styles.closeButton} onClick={close}>
//           {/* callback closes popup  */}
//           <ClosePopupSVG />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopupBase;

import styles from "./styles.module.css";
import ClosePopupSVG from "../../../assets/closePopupSVG.jsx";

const PopupBase = ({ isOpen, close, children, type }) => {
  const isChangeTaskPopup = type === "changeTask";
  const isCreateTaskPopup = type === "createTask";

  return (
    <div
      className={
        isChangeTaskPopup || isCreateTaskPopup
          ? styles.blurredScreenChangeTask
          : styles.blurredScreen
      }
      style={isOpen ? {} : { display: "none" }}
    >
      <div
        className={
          isChangeTaskPopup || isCreateTaskPopup
            ? styles.popupChangeTask
            : styles.popup
        }
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        {children}
        <div className={styles.closeButton} onClick={close}>
          <ClosePopupSVG />
        </div>
      </div>
    </div>
  );
};

export default PopupBase;
