import { XWWWPostQuery } from "./XWWWPostQuery";

export const signUpEmailCode = (email, name, renew) => {
    const URL = "/auth/sign-up/email-code";
    
    const data = { 
        "email": email,
        "name": name,
        "renew": renew
    }
    
    return XWWWPostQuery(URL, data);
}
