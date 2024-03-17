import { XWWWPostQuery } from "./XWWWPostQuery";

export const RecoverySetPassword = (email, password) => {
    const URL = "/auth/recovery/change-password";
    
    const data = { 
        "email": email,
        "password": password
    }

    return XWWWPostQuery(URL, data);
}
