import { XWWWPostQuery } from "./XWWWPostQuery";

export const signUpEmailCode = (email, name) => {
    const URL = "/auth/sign-up/email-code";
    
    const data = { 
        "email": email,
        "name": name
    }
    
    return XWWWPostQuery(URL, data);
}
