import ConfirmationCode from "../ConfirmationCode.jsx";
import { signUpConfirmEmail } from "../../api/SignUpConfirmEmail.js";
import { signUp } from "../../api/SignUp.js";
import { errorsHandler } from "../../utils/errorsHandler.js";

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
        state: { password: password },
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
    />
  );
};

export default SignUpCode;
