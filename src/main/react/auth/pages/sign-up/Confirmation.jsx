import ConfirmationCode from "../ConfirmationCode.jsx";
import { signUpConfirmEmail } from "../../api/SignUpConfirmEmail.js";
import { signUp } from "../../api/SignUp.js";
import { errorsHandler } from "../../utils/errorsHandler.js";
import { signUpEmailCode } from "../../api/SignUpEmailCode.js";

const tryConfirmEmail = (
  email,
  code,
  password,
  name,
  showPopup,
  setters,
  navigateLinks,
  navigate
) => {
  signUpConfirmEmail(email, code)
    .then((response) => {
      tryCompleteSignUp(
        email,
        password,
        name,
        showPopup,
        setters,
        navigateLinks,
        navigate
      );
    })
    .catch((err) => {
      const errData = err.response.data;
      errorsHandler(errData, showPopup, setters, navigateLinks);
    });
};

const tryGetCode = (
  email, 
  name,
  showPopup,
  callback,
  setters,
  navigateLinks,
  setPending,
  navigate
) => {
  setPending(true);

  signUpEmailCode(email, name, true)
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

const tryCompleteSignUp = (
  email,
  password,
  name,
  showPopup,
  setters,
  navigateLinks,
  navigate
) => {
  signUp(email, password, name)
    .then((response) => {
      navigate("/auth/sign-up/complete", {
        state: { password: password, haveAccess: true },
      });
    })
    .catch((err) => {
      const errData = err.response.data;
      errorsHandler(errData, showPopup, setters, navigateLinks);
    });
};

const SignUpCode = () => {
  return (
    <ConfirmationCode
      header={"Подтвердите почту"}
      APICallback={tryConfirmEmail}
      linksToPagesThatCanIncludeErrors={{
        email: "/auth/sign-in",
        password: "/auth/sign-in",
      }}
      retryCallback={tryGetCode}
    />
  );
};

export default SignUpCode;
