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
    setErrorContext();
  }

  useEffect(() => {
    if (!errorContext?.length > 0) return;
    setTimeout(() => {
      setTimeout(() => {
        setErrorContext();
      }, 2000);
    }, 4000);
    
  }, [errorContext]);

  return (
    <>
    <div className={[styles.alertContainer].join(" ")}>
    {
        (errorContext && errorContext?.length > 0) && errorContext?.map((error, i) => {
            return (
              <div
              style={{
                position: "fixed",
                top: (120 + (60*i)) + "px",
                right: "120px",
                zIndex: "999"
               }}
              >
                <div className={styles.errorsWrapper}>
                <div className={styles.errorsWindowInfo}>
                  <Error style={{ width: "30px", height: "30px" }} />
                  <div className={styles.errorsInfo}>
                    <span className={styles.errorsTitle}>{errorType["error"].name}</span>
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
