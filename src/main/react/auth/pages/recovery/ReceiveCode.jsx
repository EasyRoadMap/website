import ConfirmationCode from "../ConfirmationCode.jsx";
import { RecoveryConfirmEmail } from "../../api/RecoveryConfirmEmail.js";
import { errorsHandler } from "../../utils/errorsHandler.js";

const tryConfirmEmail = (email, code, showPopup, setters, navigateLinks, navigate) => {
  RecoveryConfirmEmail(email, code)
  .then((response) => {
    navigate("/auth/recovery/change-password");
  })
  .catch((err) => {
    const errData = err.response.data;
    errorsHandler(errData, showPopup, setters, navigateLinks);
  });
}

const RecoveryCode = () => {
  return (
    <ConfirmationCode 
      header={"Введите код"}
      APICallback={tryConfirmEmail}
      linksToPagesThatCanIncludeErrors={{
        "email": "/auth/sign-in", 
        "password": "/auth/sign-in"
      }}
    />
  );
}

export default RecoveryCode;