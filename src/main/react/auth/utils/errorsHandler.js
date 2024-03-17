import { useNavigate } from "react-router-dom";
import { getErrorDescription } from "./getErrorDescription";

export const getError = (error) => {
    return getErrorDescription(error.error_code, error.field_name ? error.field_name : null);
}

export const errorApplier = (error, setters) => {
    if (!error) return false;
    if (!Object.keys(error)) return false;
    Object.keys(error).forEach(element => {
        setters[element](error[element]); 
    });
    return true;
}

export const errorsHandler = (error, showPopup, setters, navigateLinks) => {
    if (!error.error_code) {
        return null;
    }

    navigateLinks = navigateLinks ? navigateLinks : {};

    const {field, description} = getError(error);

    if (field in navigateLinks) {
        const navigate = useNavigate();
        navigate(navigateLinks[field], {state: {error: {[field]: description}}});
        return true;
    } else if (field === "popup") {
        showPopup(description);
        return true;
    } else {
        if (typeof(field) === "string") {
            setters[field](description);
            return true;
        }
        field.forEach(element => {
            setters[element](description);
        });
        return true;
    }
}