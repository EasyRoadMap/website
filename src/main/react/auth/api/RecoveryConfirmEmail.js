import { XWWWPostQuery } from "./XWWWPostQuery";

export const RecoveryConfirmEmail = (email, code) => {
    const URL = "/auth/recovery/confirm-email";

    const data = { 
        "email": email,
        "code": code
    }

    return XWWWPostQuery(URL, data);
}
