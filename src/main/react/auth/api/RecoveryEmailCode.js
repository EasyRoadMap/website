import { XWWWPostQuery } from "./XWWWPostQuery";

export const RecoveryEmailCode = (email) => {
    const URL = "/auth/recovery/email-code";

    const data = { 
        "email": email
    }
    
    return XWWWPostQuery(URL, data);
}
