import { XWWWPostQuery } from "./XWWWPostQuery";

export const signUpConfirmEmail = (email, code) => {
    const URL = "/auth/sign-up/confirm-email";
    
    const data = { 
        "email": email,
        "code": code
    }
    
    return XWWWPostQuery(URL, data);
}
