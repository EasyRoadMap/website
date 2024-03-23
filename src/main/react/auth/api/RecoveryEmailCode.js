import { XWWWPostQuery } from "./XWWWPostQuery";

export const RecoveryEmailCode = (email, renew) => {
    const URL = "/auth/recovery/email-code";

    const data = { 
        "email": email,
        "renew": renew
    }
    
    return XWWWPostQuery(URL, data);
}
