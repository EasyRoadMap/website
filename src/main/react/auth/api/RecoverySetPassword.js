import { XWWWPostQuery } from "./XWWWPostQuery";

export const RecoverySetPassword = (email, password) => {
    const URL = "/auth/recovery/set-password";
    
    const data = { 
        "email": email,
        "password": password
    }

    return XWWWPostQuery(URL, data);
}
