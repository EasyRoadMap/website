import styles from "../style.module.css";
import React, { useState, useRef } from "react";

const VerificationCodeInput = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleChange = (index, event) => {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);

    if (event.target.value !== "") {
      if (index < code.length - 1) {
        codeRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        codeRefs.current[index - 1].current.focus();
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
    if (pastedData.length <= 120) {
      const newCode = pastedData.split("").slice(0, 6);
      setCode(newCode);
    }
  };

  return (
    <div>
      {code.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          className={styles.verification}
          value={value}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => {
            handleBackspace(index, event);
            handleArrow(index, event);
          }}
          onPaste={pasteCode}
          ref={codeRefs.current[index]}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
