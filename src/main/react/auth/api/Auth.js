import { XWWWPostQuery } from "./XWWWPostQuery";

export const Auth = (email) => {
    const URL = "/auth";

    const data = { 
        "email": email,
    }

    return XWWWPostQuery(URL, data);
}
