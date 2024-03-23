import ConfirmationCode from "../ConfirmationCode.jsx";
import { RecoveryConfirmEmail } from "../../api/RecoveryConfirmEmail.js";
import { errorsHandler } from "../../utils/errorsHandler.js";
import { RecoveryEmailCode } from "../../api/RecoveryEmailCode.js";

const tryConfirmEmail = (email, code, showPopup, setters, navigateLinks, navigate) => {
  RecoveryConfirmEmail(email, code)
  .then((response) => {
    navigate("/auth/recovery/change-password", {state: {haveAccess: true}});
  })
  .catch((err) => {
    const errData = err.response.data;
    errorsHandler(errData, showPopup, setters, navigateLinks);
  });
};

const tryGetRecovery = (email, name, showPopup, callback, setters, navigateLinks, setPending, navigate) => {
  setPending(true);
  RecoveryEmailCode(email, true)
    .then((response) => {
      callback();
    })
    .catch((err) => {
      const errData = err.response.data;
      errorsHandler(errData, showPopup, setters, navigateLinks, navigate);
    })
    .finally(() => {
      setPending(false);
    });
};

const RecoveryCode = () => {
  return (
    <ConfirmationCode 
      header={"Введите код"}
      APICallback={tryConfirmEmail}
      linksToPagesThatCanIncludeErrors={{
        "email": "/auth/sign-in", 
        "password": "/auth/sign-in"
      }}
      retryCallback={tryGetRecovery}
    />
  );
}

export default RecoveryCode;