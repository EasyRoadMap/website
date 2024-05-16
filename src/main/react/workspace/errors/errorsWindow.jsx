import styles from "./errorWindow.module.css";
import Error from "../../assets/Error.jsx";
import Warn from "../../assets/WarnSVG.jsx";
import Done from "../../assets/doneSVG.jsx";
import ClosePopupSVG from "../../assets/closePopupSVG.jsx";
import useErrorContext from "../hooks/useErrorContext.js";
import { useEffect, useState } from "react";

const errorType = {
  error: {
    name: "Ошибка!",
    icon: Error,
  },
  warn: {
    name: "Внимание!",
    icon: Warn,
  },
  done: {
    name: "Успех!",
    icon: Done,
  },
};
const ErrorsWindow = ({
  ...props
}) => {
  const { errorContext, setErrorContext } = useErrorContext();

  const closeAlert = (error) => {
    // const filteredErrors = errorContext.filter((el) => {
    //   return el.message.message !== error.message.message;
    // });
    setErrorContext();
  }

  useEffect(() => {
    if (!errorContext?.length > 0) return;
    setTimeout(() => {
      setErrorContext();
    }, props?.duration ? props.duration : 15000);
    
  }, [errorContext]);

  return (
    <>
    <div className={[styles.alertContainer].join(" ")}>
    {
        (errorContext && errorContext?.length > 0) && errorContext?.map((error, i) => {
          const errorBlockInfo = errorType[props?.type ? props.type : "error"];
          const ErrorBlock = errorBlockInfo.icon;
            return (
              <div
              style={{
                position: "fixed",
                top: (124 + (60*i)) + "px",
                right: "24px",
                zIndex: "999"
               }}
              >
                <div className={styles.errorsWrapper}>
                <div className={styles.errorsWindowInfo}>
                  <ErrorBlock style={{ width: "30px", height: "30px" }} />
                  <div className={styles.errorsInfo}>
                    <span className={styles.errorsTitle}>{errorBlockInfo.name}</span>
                    <span className={styles.errorsText}>{error.message.message}</span>
                  </div>
                </div>
                <div className={styles.closeButton}>
                  <ClosePopupSVG onClick={() => closeAlert(error)}/>
                </div>
                </div>
              </div>
            )
        })
    }
    </div>
    {props.children}
    </>
)
};

export default ErrorsWindow;
