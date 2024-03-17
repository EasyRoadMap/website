import { signIn } from "./SignIn";
import { getError } from "../utils/errorsHandler";
import { useNavigate } from "react-router-dom";


export const trySignIn = (email, password, check, setPending) => {
    setPending(true);
    signIn(email, password, check)
        .then((response) => {
            document.location.replace(response.request.responseURL);
        })
        .catch((err) => {
            const navigate = useNavigate();
            const errData = err.response.data;
            const {field, description} = getError(errData);
            if (typeof(field) === "string") {
                navigate("/auth/sign-in", {state: {error: {"email": description}}});
            } else {
                const errors = {};
                field.forEach(element => {
                    Object.assign(errors, {[element]: description});
                });
                navigate("/auth/sign-in", {state: {error: {errors}}});
            }
            
        }).finally(() => {
            setPending(false);
        })
}