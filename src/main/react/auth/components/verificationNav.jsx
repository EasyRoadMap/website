import styles from "./verificationNav.module.css";
import React, { useState, useRef } from "react";
import ErrorTooltip from "./ErrorTooltip.jsx";

const VerificationCodeInput = ({ code, setCode, error, clearError }) => {
  const inputStyle = error ? styles.error : "";
  const [active, setActive] = useState(false);
  const codeRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const getFirstEmptyCell = () => {
    let cellIndex = 0;
    let cellFound = false;
    for (const cell of code) {
      if (cell === "") {
        cellFound = true;
        break;
      }
      else cellIndex++;
    }
    return cellFound ? cellIndex : -1;
  }

  const handleChange = (index, event) => {
    if (event.target.value === "") {
      event.target.value = event.data.toUpperCase();
      const newCode = [...code];
      newCode[index] = event.target.value;
      setCode(newCode);

      if (event.target.value !== "") {
        if (index < code.length - 1) {
          codeRefs.current[index + 1].current.focus();
        }
      }
    }
    else {
      const newCode = [...code];
      const jumpToPos = getFirstEmptyCell();
      if (jumpToPos === -1) {
        codeRefs.current[code.length - 1].current.focus();
        return;
      }

      newCode[jumpToPos] = event.data.toUpperCase();
      setCode(newCode);

      if (event.data !== "") {
        codeRefs.current[jumpToPos].current.focus();
      }
    }
    clearError();
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace") {
      clearError();
      if (event.target.value === "") {
        if (index > 0) {
          const newCode = [...code];
          newCode[index - 1] = "";
          setCode(newCode);
          codeRefs.current[index - 1].current.value = newCode;
          codeRefs.current[index - 1].current.focus();
        }
      } else {
        event.preventDefault();
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        if (index > 0) {
          codeRefs.current[index - 1].current.focus();
        }
      }
    }
  };

  const handleArrow = (index, event) => {
    if (event.key === "ArrowLeft") {
      if (index > 0) {
        codeRefs.current[index - 1].current.focus();
      }
    } else if (event.key === "ArrowRight") {
      if (index < code.length - 1) {
        codeRefs.current[index + 1].current.focus();
      }
    }
  };

  const pasteCode = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");
    if (pastedData.trim().length > 0) {
      if (pastedData.length <= 120) {
        const newCode = pastedData.split("").slice(0, 6);
        setCode(newCode);
      }
    } else {
      event.preventDefault();
    }
  };

  return (
    <div>
      {code.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          className={[styles.verification, inputStyle].join(" ")}
          value={value}
          onBeforeInput={(event) => handleChange(index, event)}
          onKeyDown={(event) => {
            handleBackspace(index, event);
            handleArrow(index, event);
          }}
          onPaste={pasteCode}
          ref={codeRefs.current[index]}
          placeholder="_"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        />
      ))}

      <ErrorTooltip isShown={active && error} errorText={error} stylesFromOutside={{width: "330px", marginLeft: "3px", marginTop: "10px"}}/>
    </div>
  );
};

export default VerificationCodeInput;
