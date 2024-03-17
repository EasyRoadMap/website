import { useState, useEffect } from "react";

import { save, get, remove } from "../utils/sessionStorage";
import { validate } from "../utils/emailValidation";

export const useEmail = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = get("email");
    setEmail(storedEmail ? storedEmail : "");
  }, []);

  const saveEmail = (newEmail) => {
    if (!validate(newEmail)) throw Error("Введите существующий email");
    save("email", newEmail);
    setEmail(newEmail);
  };

  const removeEmail = () => {
    remove("email");
    setEmail("");
  };

  return { email, setEmail, saveEmail, removeEmail };
};